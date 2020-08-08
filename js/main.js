let app = new Vue({
	el: '#app',
	data: {
		vidLink: '',
		vidLinkInput: '',
		vidDesc: '',
		subKeyword: '',
		foundList: [],
		foundListFlattened: [],
		loadingResult: false,
		error: false
	},
	watch: {
		subKeyword: util.debounce(async function subKeywordHandler()
		{
			this.clearResult()
			if(this.vidLinkInput != this.vidDesc.title)
					this.vidLink = this.vidLinkInput
			if(this.vidLink != '') {
				if(this.vidLink.length > 0 && this.subKeyword.length >= 3) {
					fetch('https://cari-teks-video-api.vercel.app/api/search?url=' + encodeURIComponent(this.vidLink) + '&q=' + this.subKeyword)
						.then(response => response.json())
						.then(data => {
							this.foundList.push(data)
							if(data.total > 0) 
								this.flattenResult(data)
						})
						.catch((error) => {
							console.error('Error:', error);
							this.error = true
						})
				}
			}
		}
		,250),
		vidLinkInput: util.debounce(async function findVideoTitle()
			{
				if(this.vidLinkInput != this.vidDesc.title)
					this.vidLink = this.vidLinkInput
				fetch('https://yt-title-find.000webhostapp.com/?url=' + encodeURIComponent(this.vidLink))
					.then(response => response.json())
					.then(data => {
						this.vidDesc = data
					})
					.then(() => {
						if(this.vidDesc.title != undefined)
							this.vidLinkInput = this.vidDesc.title
					})
					.catch((error) => {
						console.error('Error:', error);
						this.error = true
					})
			}
		,250)
	},
	methods: {
		clearKeyword(event)
		{
			this.subKeyword = ''
			this.clearResult()
		},
		clearResult()
		{
			this.error = false
			this.loadingResult = false
			this.foundList = []
			this.foundListFlattened = []
		},
		clearAll(event)
		{
			this.clearKeyword()
			this.clearResult()
			this.vidLink = ''
			this.vidLinkInput = ''
			this.vidDesc = ''
			this.$refs.subKeyword.value = ''
		},
		loadingResultVisible(isVisible, entry)
		{
			this.loadingResult = isVisible
			if(isVisible) this.loadResult()
		},
		loadResult ()
		{
			if(this.foundList.length > 0 && this.foundList[0].total > 0 && this.foundList[this.foundList.length-1].next != null){
				fetch(this.foundList[this.foundList.length-1].next)
					.then(response => response.json())
					.then(data => {
						this.foundList.push(data)
						if(data.total > 0) 
							this.flattenResult(data)
					})
					.then(() => {
						if(this.loadingResult) this.loadResult()
					})
					.catch((error) => {
						console.error('Error:', error)
						this.error = true
					})
			}
		},
		flattenResult(target)
		{
			for (a of target.data) {
				this.foundListFlattened.push(a)
			}

		},
		setToVidLink(event)
		{
			event.target.value = this.vidLink
		},
		resetToTitleOrURL(event)
		{
			if(this.vidDesc != '' && this.vidDesc.title != undefined) event.target.value = this.vidDesc.title
			else if(this.vidLink != '') event.target.value = this.vidLink
			else event.target.value = this.vidLinkInput
		},
		convertSecond (totalSeconds){
			let hour = Math.floor(totalSeconds/3600)
			totalSeconds %= 3600
			let minute = Math.floor(totalSeconds/60)
			let seconds = totalSeconds % 60
			return '' + ((hour > 0)? hour + 'J:' : '') + ((minute > 0)? minute + 'M:' : '') + seconds + 'D'
		}
	}
})
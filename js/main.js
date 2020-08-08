let app = new Vue({
	el: '#app',
	data: {
		vidLink: '',
		vidLinkInput: '',
		vidDesc: '',
		subKeyword: '',
		foundList: [],
		loadingResult: false,
		error: false
	},
	methods: {
		clearKeyword(event)
		{
			this.subKeyword = ''
		},
		clearResult()
		{
			this.error = false
			this.foundList = []
		},
		clearAll(event)
		{
			this.vidLink = ''
			this.vidLinkInput = ''
			this.vidDesc = ''
			this.subKeyword = ''
			this.foundList = []
			this.$refs.subKeyword.value = ''
		},
		loadingResultVisible(isVisible, entry)
		{
			console.log({isVisible,entry})
			this.loadingResult = isVisible
			if(isVisible) this.loadResult()
		},
		loadResult ()
		{
			if(this.foundList.length > 0 && this.foundList[0].total > 0 && this.foundList[this.foundList.length-1].next != null){
				console.log('load')
				fetch(this.foundList[this.foundList.length-1].next)
					.then(response => response.json())
					.then(data => {
						console.log(data)
						this.foundList.push(data)
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
		searchSubAndVidDesc()
		{
			// this.loadingResult = true
			fetch('https://yt-title-find.000webhostapp.com/?url=' + encodeURIComponent(this.vidLinkInput))
				.then(response => response.json())
				.then(data => {
					this.vidDesc = data
					console.log(data)
				})
			this.vidLink = this.vidLinkInput
			if(this.vidLink.length > 0 && this.subKeyword.length >= 3) {
				fetch('https://cari-teks-video-api.vercel.app/api/search?url=' + encodeURIComponent(this.vidLink) + '&q=' + this.subKeyword)
					.then(response => response.json())
					.then(data => {
						console.log(data)
						this.foundList.push(data)
					})
					.catch((error) => {
						console.error('Error:', error);
						this.error = true
					})
			}
		},
		setToVidLink()
		{
			this.target
		},
		setToVidLinkInput()
		{

		},
		resetVidLinkInput()
		{

		}
	}
})
var util = {}
// Debounce Method
// ---------------
/*
    Return a function, that, as long as it continues to be invoked, will
    not be triggered. The function will be called after it stops being 
    called for `wait` milliseconds. If `immediate` is passed, trigger the 
    function on the leading edge, instead of the trailing.
*/
util.debounce = function(func, wait, immediate) {
    /*
    Declare a variable named `timeout` variable that we will later use 
    to store the *timeout ID returned by the `setTimeout` function.
    *When setTimeout is called, it retuns a numeric ID. This unique ID
    can be used in conjunction with JavaScript's `clearTimeout` method 
    to prevent the code passed in the first argument of the `setTimout`
    function from being called. Note, this prevention will only occur
    if `clearTimeout` is called before the specified number of 
    milliseconds passed in the second argument of setTimeout have been
    met.
    */
    var timeout
    /*
    Return an anomymous function that has access to the `func`
    argument of our `debounce` method through the process of closure.
    */
    return function() {
        /*
        1) Assign `this` to a variable named `context` so that the 
        `func` argument passed to our `debounce` method can be 
        called in the proper context.
        2) Assign all *arugments passed in the `func` argument of our
        `debounce` method to a variable named `args`.
        *JavaScript natively makes all arguments passed to a function
        accessible inside of the function in an array-like variable 
        named `arguments`. Assinging `arguments` to `args` combines 
        all arguments passed in the `func` argument of our `debounce` 
        method in a single variable.
        */
        var context = this,   /* 1 */
            args = arguments /* 2 */
        /*
        Assign an anonymous function to a variable named `later`.
        This function will be passed in the first argument of the
        `setTimeout` function below.
        */
        var later = function() {
            /*      
            When the `later` function is called, remove the numeric ID 
            that was assigned to it by the `setTimeout` function.
            Note, by the time the `later` function is called, the
            `setTimeout` function will have returned a numeric ID to 
            the `timeout` variable. That numeric ID is removed by 
            assiging `null` to `timeout`.
            */
            timeout = null
            /*
            If the boolean value passed in the `immediate` argument 
            of our `debouce` method is falsy, then invoke the 
            function passed in the `func` argument of our `debouce`
            method using JavaScript's *`apply` method.
            *The `apply` method allows you to call a function in an
            explicit context. The first argument defines what `this`
            should be. The second argument is passed as an array 
            containing all the arguments that should be passed to 
            `func` when it is called. Previously, we assigned `this` 
            to the `context` variable, and we assigned all arguments 
            passed in `func` to the `args` variable.
            */
            if ( !immediate ) {
                func.apply(context, args)
            }
        }
        /*
        If the value passed in the `immediate` argument of our 
        `debounce` method is truthy and the value assigned to `timeout`
        is falsy, then assign `true` to the `callNow` variable.
        Otherwise, assign `false` to the `callNow` variable.
        */
        var callNow = immediate && !timeout
        /*
        As long as the event that our `debounce` method is bound to is 
        still firing within the `wait` period, remove the numerical ID  
        (returned to the `timeout` vaiable by `setTimeout`) from 
        JavaScript's execution queue. This prevents the function passed 
        in the `setTimeout` function from being invoked.
        Remember, the `debounce` method is intended for use on events
        that rapidly fire, ie: a window resize or scroll. The *first* 
        time the event fires, the `timeout` variable has been declared, 
        but no value has been assigned to it - it is `undefined`. 
        Therefore, nothing is removed from JavaScript's execution queue 
        because nothing has been placed in the queue - there is nothing 
        to clear.
        Below, the `timeout` variable is assigned the numerical ID 
        returned by the `setTimeout` function. So long as *subsequent* 
        events are fired before the `wait` is met, `timeout` will be 
        cleared, resulting in the function passed in the `setTimeout` 
        function being removed from the execution queue. As soon as the 
        `wait` is met, the function passed in the `setTimeout` function 
        will execute.
        */
        clearTimeout(timeout)
        /*
        Assign a `setTimout` function to the `timeout` variable we 
        previously declared. Pass the function assigned to the `later` 
        variable to the `setTimeout` function, along with the numerical 
        value assigned to the `wait` argument in our `debounce` method. 
        If no value is passed to the `wait` argument in our `debounce` 
        method, pass a value of 200 milliseconds to the `setTimeout` 
        function.  
        */
        timeout = setTimeout(later, wait || 200)
        /*
        Typically, you want the function passed in the `func` argument
        of our `debounce` method to execute once *after* the `wait` 
        period has been met for the event that our `debounce` method is 
        bound to (the trailing side). However, if you want the function 
        to execute once *before* the event has finished (on the leading 
        side), you can pass `true` in the `immediate` argument of our 
        `debounce` method.
        If `true` is passed in the `immediate` argument of our 
        `debounce` method, the value assigned to the `callNow` variable 
        declared above will be `true` only after the *first* time the 
        event that our `debounce` method is bound to has fired.
        After the first time the event is fired, the `timeout` variable
        will contain a falsey value. Therfore, the result of the 
        expression that gets assigned to the `callNow` variable is 
        `true` and the function passed in the `func` argument of our
        `debounce` method is exected in the line of code below.
        Every subsequent time the event that our `debounce` method is 
        bound to fires within the `wait` period, the `timeout` variable 
        holds the numerical ID returned from the `setTimout` function 
        assigned to it when the previous event was fired, and the 
        `debounce` method was executed.
        This means that for all subsequent events within the `wait`
        period, the `timeout` variable holds a truthy value, and the
        result of the expression that gets assigned to the `callNow`
        variable is `false`. Therefore, the function passed in the 
        `func` argument of our `debounce` method will not be executed.  
        Lastly, when the `wait` period is met and the `later` function
        that is passed in the `setTimeout` function executes, the 
        result is that it just assigns `null` to the `timeout` 
        variable. The `func` argument passed in our `debounce` method 
        will not be executed because the `if` condition inside the 
        `later` function fails. 
        */
        if ( callNow ) { 
            func.apply(context, args)
        }
    }
}

/* vue.js vue-observer-visibility
 * https://github.com/Akryum/vue-observe-visibility
 */
util.VueObserveVisibility=function(e){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e){return function(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var r=function(){function e(t,i,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=t,this.observer=null,this.frozen=!1,this.createObserver(i,n)}var t,r,o;return t=e,(r=[{key:"createObserver",value:function(e,t){var i=this;if(this.observer&&this.destroyObserver(),!this.frozen){var r;if(this.options="function"==typeof(r=e)?{callback:r}:r,this.callback=function(e,t){i.options.callback(e,t),e&&i.options.once&&(i.frozen=!0,i.destroyObserver())},this.callback&&this.options.throttle){var o=(this.options.throttleOptions||{}).leading;this.callback=function(e,t){var i,r,o,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=function(s){for(var a=arguments.length,c=new Array(a>1?a-1:0),u=1;u<a;u++)c[u-1]=arguments[u];if(o=c,!i||s!==r){var f=l.leading;"function"==typeof f&&(f=f(s,r)),i&&s===r||!f||e.apply(void 0,[s].concat(n(o))),r=s,clearTimeout(i),i=setTimeout(function(){e.apply(void 0,[s].concat(n(o))),i=0},t)}};return s._clear=function(){clearTimeout(i),i=null},s}(this.callback,this.options.throttle,{leading:function(e){return"both"===o||"visible"===o&&e||"hidden"===o&&!e}})}this.oldResult=void 0,this.observer=new IntersectionObserver(function(e){var t=e[0];if(e.length>1){var n=e.find(function(e){return e.isIntersecting});n&&(t=n)}if(i.callback){var r=t.isIntersecting&&t.intersectionRatio>=i.threshold;if(r===i.oldResult)return;i.oldResult=r,i.callback(r,t)}},this.options.intersection),t.context.$nextTick(function(){i.observer&&i.observer.observe(i.el)})}}},{key:"destroyObserver",value:function(){this.observer&&(this.observer.disconnect(),this.observer=null),this.callback&&this.callback._clear&&(this.callback._clear(),this.callback=null)}},{key:"threshold",get:function(){return this.options.intersection&&this.options.intersection.threshold||0}}])&&i(t.prototype,r),o&&i(t,o),e}();function o(e,t,i){var n=t.value;if(n)if("undefined"==typeof IntersectionObserver)console.warn("[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill");else{var o=new r(e,n,i);e._vue_visibilityState=o}}function l(e){var t=e._vue_visibilityState;t&&(t.destroyObserver(),delete e._vue_visibilityState)}var s={bind:o,update:function(e,i,n){var r=i.value;if(!function e(i,n){if(i===n)return!0;if("object"===t(i)){for(var r in i)if(!e(i[r],n[r]))return!1;return!0}return!1}(r,i.oldValue)){var s=e._vue_visibilityState;r?s?s.createObserver(r,n):o(e,{value:r},n):l(e)}},unbind:l};function a(e){e.directive("observe-visibility",s)}var c={version:"0.4.6",install:a},u=null;return"undefined"!=typeof window?u=window.Vue:"undefined"!=typeof global&&(u=global.Vue),u&&u.use(c),e.ObserveVisibility=s,e.default=c,e.install=a,e}({});
// Install VueObserveVisibility
Vue.use(util.VueObserveVisibility)

// Function to conver second to readable xJ:xM:xD (Jam, Menit, Detik)
util.convertSecond = (totalSeconds) => {
    let hour = Math.floor(totalSeconds/3600)
    totalSeconds %= 3600
    let minute = Math.floor(totalSeconds/60)
    let seconds = totalSeconds % 60
    return '' + ((hour > 0)? hour + 'J:' : '') + ((minute > 0)? minute + 'M:' : '') + seconds + 'D'
}
'use strict';


class Renderer {
	constructor (callback, duration) {
		this.initT = Date.now();
		this.d = duration;
		this.callback = callback;
		this.isExpired = false;
	}
	// t is the current time for the animation.
	render (t) {
		this.isExpired = t - this.initT > this.d;
		this.callback.call(null, t, this.initT, this.c, this.d);
	}
}


module.exports = Renderer;

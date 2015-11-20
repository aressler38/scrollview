'use strict';

var _FPS = 120;
var _lastT = 0;
var _renderQueue = new Map();
var _dT = 1000 / _FPS;

var _expiredQueue = [ ];

requestAnimationFrame(update);

function update (t) {
	if ( t - _lastT > _dT ) {
		_lastT = t;
		var now = Date.now();
		var it = _renderQueue.entries();

		for ( var pair of _renderQueue.entries() ) {
			if ( pair[1].isExpired ) {
				_expiredQueue.push(pair[0]);
				continue;
			}
			pair[1].render(now);
		}
		while ( _expiredQueue.length ) {
			_renderQueue.delete(_expiredQueue[0]);
			_expiredQueue.shift();
		}

	}
	requestAnimationFrame(update);
}


class Base {

	constructor () {
		
	}


	addRenderer (renderer) {
		console.log("ADDING RENDERER", renderer);
		_renderQueue.set(Date.now()+'-'+Math.random(), renderer);
	}

	// t: current time, b: begInnIng value, c: change In value, d: duration
	easeInQuart (t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	}
	easeOutQuart (t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	}
	easeInOutQuart (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	}




}

module.exports = Base;

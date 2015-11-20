'use strict';

var Base = require('./base');
var Renderer = require('./renderer');



class ScrollView extends Base {

	constructor() {
		super();
		var self = this;
		this.templateHeight = null;
		this.node = document.createElement('div');
		this.node.classList.add('scroll-view');

		this.velocityThreshold = 0.0;
		this.sensitivityThreshold = 16;
		this.timingFunction = this.easeOutQuart;

		this.dataset = [ ];
		this.containers = [ ];

		var _template = null;
		Object.defineProperty(this, 'template', {
			set : function (node) { _template = node.cloneNode(true); },
			get : function () { return _template.cloneNode(true); }
		});


		this.y0 = null;
		this.offset = 0;
		this.viewableTemplates = 0; 

		var sharedContext = {
			y1:0,
			y0:0,
			t0:0,
			isScrolling:false
		};

		this.node.addEventListener('touchstart', function (e) { onTouchStart.call(sharedContext, e); });
		this.node.addEventListener('touchmove', function (e) { 
			if ( sharedContext.isScrolling ) {
				e.preventDefault();
				onTouchMove.call(sharedContext, e.touches[0].clientY);
			}
		});
		this.node.addEventListener('touchend', function () { onTouchEnd.call(sharedContext); });


		/**
		 * @this sharedContext
		 */
		function onTouchStart (e) {
			this.t0 = Date.now();
			this.y0 = e.touches[0].clientY;
			this.isScrolling = true;
		}

		/**
		 * @this sharedContext
		 */
		function onTouchMove (y) {
				this.y0 = this.y0;
				this.y1 = y;
				this.dy = this.y1 - this.y0;
				var dyMod = this.dy % self.containerTemplateHeight;
				var isScrollingUp = this.dy > self.containerTemplateHeight ;
				var isScrollingDown = this.dy < -self.containerTemplateHeight ;

				if ( isScrollingUp ) {
					if ( self.offset ) {
						this.y0 = this.y1;
						--self.offset;
						self.shift();
					} else { 
						return;
					}
				} else if ( isScrollingDown ) {
					if ( 1+self.offset + self.viewableTemplates < self.dataset.length ) {
						this.y0 = this.y1;
						++self.offset;
						self.shift();
					} else {
						return;
					}
				}

				for ( var i=0; i<self.containers.length; ++i ) {
					self.containers[i].style.transform = 'translate3d(0,'+((i-1)*self.containerTemplateHeight + dyMod)+'px,0)';
				}

		}

		/**
		 * @this sharedContext
		 */
		function onTouchEnd () {
			console.debug(this.dy, this.t0);
			var velocity = this.dy / (Date.now() - this.t0) 
			this.y0 = 0;
			this.isScrolling = false;
			var magnitude = Math.abs(this.dy);


			if ( 
					self.velocityThreshold < Math.abs(velocity) &&
					self.sensitivityThreshold < magnitude
				 ) 
			{
				// touchstart init stuff
				var now = this.t0 = Date.now();
				var beginningVal = this.y0 = 0;
				this.isScrolling = true;
				var changeVal = velocity * 1000;
				var durationVal = 1000;


				// make a renderer and put it in the render queue
				var renderer = new Renderer(function (t) {
					var val = self.timingFunction(t-now, beginningVal, changeVal, durationVal); 
					console.log('v='+velocity, 'mag='+magnitude, 'change='+changeVal, 'val='+val);
					onTouchMove.call(sharedContext, val);
				}, durationVal);

				self.addRenderer(renderer);
			}

		}

	}


	/** 
	 * Move data from the dataset to the containers
	 */
	shift () {
		var c;
		for ( var i=0; i<this.containers.length; ++i ) {
			if ( ! this.dataset[this.offset + i ] ) { console.debug('continue...'); continue; }
			c = this.containers[i];
			if ( c.firstChild ) c.removeChild(c.firstChild);
			c.appendChild(this.dataset[this.offset + i ]);
		}
	}


	createContainers () {
		this.clear();
		var rect = this.node.getBoundingClientRect();
		var computedStyle = getComputedStyle( this.node );
		var scrollViewPadding = parseInt( computedStyle.padding );
		var borderHeight = parseInt( computedStyle.borderBottomWidth ) + parseInt( computedStyle.borderTopWidth );
		var scrollViewHeight = Math.ceil( rect.bottom - rect.top ) - scrollViewPadding - borderHeight;

		this.node.appendChild(this.template);
		var liveTemplate = this.node.querySelector(':first-child');

		rect = liveTemplate.getBoundingClientRect();
		var dy = Math.ceil( rect.bottom - rect.top );
		this.containerTemplateHeight = dy;

		this.clear();
		// if y*dy == scrollViewHeight, then we need AT LEAST y sub templates to fill the view.

		var y = Math.ceil( scrollViewHeight / dy );
		this.viewableTemplates = y;

		var bufferRoom = 2; // TODO: testing extra containers

		for ( var i=0; i<y + bufferRoom; ++i ) {
			var container = this.template;
			this.node.appendChild(container);
			this.containers.push(container);
		}

		this.refresh();
		this.render();
	}


	/**
	 * Put some dataset elements into view template containers.
	 */
	render () {
		var c;
		for (var i=1; i<this.viewableTemplates; ++i) {
			c = this.containers[i];
			if ( c.firstChild ) c.removeChild(c.firstChild);
			c.appendChild(this.dataset[(i-1) + this.offset]);
		}
	}


	/**
	 * Remove the container DOM elements.
	 */
	clear () {
		while ( this.node.lastChild ) {
			this.node.removeChild(this.node.lastChild);
		}
		while ( this.containers.length ) {
			this.containers.pop();
		}
	}


	/**
	 * Set the transforms of the container elements so they line up properly.
	 */
	refresh () {
		for ( var i=0; i<this.containers.length; ++i ) {
			this.containers[i].style.transform = 'translate3d(0,'+((i-1)*this.containerTemplateHeight)+'px,0)';
		}
	}


}

module.exports = ScrollView;


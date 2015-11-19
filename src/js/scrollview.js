'use strict';



class ScrollView {

	constructor() {
		var self = this;
		var containerEl =  document.createElement('div');
		containerEl.classList.add('scroll-view-element');
		this.containerTemplate = null;
		this.containerTemplateHeight = null;

		this.setContainerTemplate(containerEl);

		this.el = document.createElement('div');
		this.el.classList.add('scroll-view');

		this.dataset = [ ];
		this.containers = [ ];

		this.y0 = null;
		this.offset = 0;
		

		var _isScrolling = false;

		this.el.addEventListener('touchstart', function (e) {
			self.y0 = e.touches[0].clientY;
			_isScrolling = true;
		});

		this.el.addEventListener('touchmove', function (e) {
			var i, y0, y, dyMod, container, dy;
			if ( _isScrolling ) {
				y0 = self.y0;
				y = e.touches[0].clientY;
				dy = y - y0;
				dyMod = dy % self.containerTemplateHeight;
				if ( dy > self.containerTemplateHeight ) { // scrolling up 
					container = self.el.firstChild; 
					--self.offset;
					self.y0 = y;
				} else if ( dy < -self.containerTemplateHeight ) { // scrolling down
					container = self.el.lastChild; 
					++self.offset;
					self.y0 = y;
					self.shiftUp();
				}

				for ( i=0; i<self.containers.length; ++i ) {
					self.containers[i].style.transform = 'translate3d(0,'+((i-1)*self.containerTemplateHeight + dyMod)+'px,0)';
				}

			}
		});

		this.el.addEventListener('touchend', function (e) {
			self.y0 = null;
			_isScrolling = false;
		});


		Object.defineProperty(this, 'template', {
			get : function () { return this.containerTemplate && this.containerTemplate.cloneNode(true); }
		});


	}

	/** 
	 * Move data from higher indexed elements to lower indexed elements.
	 */
	shiftUp () {
		for ( var i=0; i<this.containers.length-1; ++i ) {
			this.containers[i].innerHTML = this.containers[i+1].innerHTML; // TODO: get it from the dataset
		}
		this.containers[ this.containers.length-1 ].innerHTML = ''; // get it from the dataset...
	}

	shiftDown () {

	}

	setContainerTemplate (element) {
		this.containerTemplate = element.cloneNode(true);
	}

	appendContainer (data) {
		var container = this.template;
		container.innerHTML = data;
		this.el.appendChild(container);
		this.containers.push(container);
		//TODO: render data on template

	}

	createContainers () {
		this.clear();
		var rect = this.el.getBoundingClientRect();
		var computedStyle = getComputedStyle( this.el );
		var scrollViewPadding = parseInt( computedStyle.padding );
		var borderHeight = parseInt( computedStyle.borderBottomWidth ) + parseInt( computedStyle.borderTopWidth );
		var scrollViewHeight = Math.ceil( rect.bottom - rect.top ) - scrollViewPadding - borderHeight;

		this.el.appendChild(this.template);
		var liveTemplate = this.el.querySelector(':first-child');

		rect = liveTemplate.getBoundingClientRect();
		var dy = Math.ceil( rect.bottom - rect.top );
		this.containerTemplateHeight = dy;


		this.clear();
		// if y*dy == scrollViewHeight, then we need AT LEAST y sub templates to fill the view.

		var y = Math.ceil( scrollViewHeight / dy );

		var bufferRoom = 3; // TODO: testing extra containers
		for ( var i=0; i<y + bufferRoom; ++i ) {
			this.appendContainer(''+i);
		}

		this.refresh();
	}


	/**
	 * Remove the container DOM elements.
	 */
	clear () {
		while ( this.el.lastChild ) {
			this.el.removeChild(this.el.lastChild);
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

	update () {

	}

	insert () {

	}

	remove () {

	}


}

module.exports = ScrollView;


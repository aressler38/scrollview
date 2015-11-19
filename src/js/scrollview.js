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
		

		var _isScrolling = false;

		this.el.addEventListener('touchstart', function (e) {
			self.y0 = e.touches[0].clientY;
			_isScrolling = true;
		});
		this.el.addEventListener('touchmove', function (e) {
			var y0, y;
			if ( _isScrolling ) {
				y0 = self.y0;
				y = e.touches[0].clientY;
				var dy = y - y0;
				var dyMod = dy % self.containerTemplateHeight;
				var container;
				if ( dy > self.containerTemplateHeight ) {
					container = self.el.firstChild; 
					self.el.removeChild( container );
					self.el.appendChild( container );
				} else if ( dy < self.containerTemplateHeight ) {
					container = self.el.lastChild; 
					self.el.removeChild( container );
					self.el.insertBefore(container, self.el.firstChild);
				}
				for ( var i=0; i<self.containers.length; ++i ) {
					self.containers[i].style.transform = 'translate3d(0,'+dyMod+'px,0)';
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

	}


	clear () {
		while ( this.el.lastChild ) {
			this.el.removeChild(this.el.lastChild);
		}
		while ( this.containers.length ) {
			this.containers.pop();
		}
	}

	refresh () {

	}

	update () {

	}

	insert () {

	}

	remove () {

	}


}

module.exports = ScrollView;


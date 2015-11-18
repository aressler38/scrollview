'use strict';

class ScrollView {

	constructor() {
		var containerEl =  document.createElement('div');
		containerEl.classList.add('scroll-view-element');
		this.containerTemplate = null;

		this.setContainerTemplate(this.containerTemplate);

		this.el = document.createElement('div');
		this.el.classList.add('scroll-view');

		this.dataset = [ ];

		//this.el.addEventListener('touchstart', 
		
		Object.defineProperty(this, 'template', {
			get : function () { return this.containerTemplate && this.containerTemplate.cloneNode(true); }
		});

		
	}


	setContainerTemplate (element) {
		this.containerTemplate = element.cloneNode(true);
	}

	createContainers () {
		clear();
		var rect = this.el.getBoundingClientRect();
		var scrollViewHeight = Math.ceil( rect.bottom - rect.top );

		this.el.appendChild(this.template);
		var liveTemplate = this.el.querySelector(':first-child');

		rect = liveTemplate.getBoundingClientRect();
		var dy = Math.ceil( rect.bottom - rect.top );

		// if y*dy == scrollViewHeight, then we need AT LEAST y sub templates to fill the view.


		





	}

	clear () {
		while ( this.el.lastChild ) {
			this.el.removeChild(this.el.lastChild);
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


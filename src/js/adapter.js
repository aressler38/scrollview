'use strict';



class Adapter {

	createViewHolder () { 
		var item = document.createElement('div');
		item.classList.add('scrollview-element');
		return item;
	}

}	

module.exports = Adapter;

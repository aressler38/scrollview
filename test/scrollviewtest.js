var ScrollView = require('../src/js/scrollview');

if ( document.readyState === 'complete' || document.readyState === 'interactive' ) {
	main()
} else {
	document.addEventListener('DOMContentLoaded', main);
}

function main () {
	
	var tmplEl =  document.createElement('div');
	window.ScrollView = ScrollView;
	var scrollview = new ScrollView();

	tmplEl.classList.add('scroll-view-element');


	scrollview.template = tmplEl;

	document.body.appendChild(scrollview.node);

	var i=1001;
	while ( i-- ) {
		var el = document.createElement('div');
		el.innerHTML = i;
		el.onclick = clicker;
		scrollview.dataset.push(el);
	}

	scrollview.createContainers();

	window.sv = scrollview;

	function clicker (e) {
		console.debug(this.innerHTML);
	}

}

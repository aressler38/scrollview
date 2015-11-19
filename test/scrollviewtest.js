var ScrollView = require('../src/js/scrollview');

if ( document.readyState === 'complete' || document.readyState === 'interactive' ) {
	main()
} else {
	document.addEventListener('DOMContentLoaded', main);
}

function main () {
	
	var scrollview = new ScrollView();

	document.body.appendChild(scrollview.el);

	scrollview.createContainers();

	window.sv = scrollview;

}

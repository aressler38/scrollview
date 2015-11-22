var ScrollView = require('../src/js/scrollview');

if ( document.readyState === 'complete' || document.readyState === 'interactive' ) {
	main()
} else {
	document.addEventListener('DOMContentLoaded', main);
}


var scrollview;

function main () {
	
	scrollview = new ScrollView();
	scrollview.template = document.createElement('div');


	document.body.querySelector('#test-box').appendChild(scrollview.node);

	var i=1001;
	while ( i-- ) {
		var el = document.createElement('div');
		el.innerHTML = i;
		el.onclick = clicker;
		scrollview.dataset.push(el);
	}

	scrollview.initialize();

	function clicker (e) {
		console.debug(this.innerHTML);
	}

	bindEvents();
}


function bindEvents () {
	var controlls = Array.prototype.slice.call(document.querySelectorAll('.controlls'), 0);
	var setHeight = document.getElementById('set-height');
	var height = document.getElementById('height');
	setHeight.onclick = function () {
		scrollview.node.style.height = height.value + 'px';	
		scrollview.initialize();
	};

	var controllToggle = document.getElementById('controll-toggle');
	var controllsActive = false;

	controllToggle.onclick = function () {
		controlls.forEach(function (node) {
			node.classList.remove('hidden');
			controllToggle.classList.remove('active');
			controllsActive = ! controllsActive;
			if ( ! controllsActive ) {
				node.classList.add('hidden');
			} else {
				controllToggle.classList.add('active');
			}
		});
	};
}

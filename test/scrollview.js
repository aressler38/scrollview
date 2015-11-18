(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}]},{},[1]);

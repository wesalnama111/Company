/**
 * demo2.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	class Menu {
		constructor(el) {
			this.DOM = {};
			this.DOM.el = el;
			this.DOM.items = Array.from(this.DOM.el.querySelectorAll('.menu__item'));
			this.DOM.bgshape = document.querySelector('svg.scene .path3');
			
			this.initialShape = this.DOM.bgshape.getAttribute('d');
			this.initialcolor = this.DOM.bgshape.getAttribute('fill');
			this.initialclass = this.DOM.bgshape.getAttribute('class');

			this.eventClass=null
			this.initEvents();
		}
		// var eventClass= null;
		changeShape(el) {
			
			var classes= document.getElementById('path3');
			classes.classList.remove(this.eventClass);
			classes.classList.add(el.dataset.class);
			this.eventClass=null;
			console.log("null:",this.eventClass);
			this.eventClass=el.dataset.class;
			anime.remove(this.DOM.bgshape);
			anime.remove(this.initialcolor);
			console.log("added class",this.eventClass);
			anime({
				targets: this.DOM.bgshape,
				duration: 3000,
				// easing: 'easeInOutBack',
				easing: 'easeOutQuad',
				d: el.dataset.shape,
				// class:el.dataset.class
				
			});
			

		}

		resetShape() {
			  var resetcolor= document.getElementById('path3');
			  resetcolor.classList.remove(this.eventClass);
			  // resetcolor.removeAttribute('d').value;
			  
			anime.remove(this.DOM.bgshape);
			anime({
				targets: this.DOM.bgshape,
				duration: 3000,
				easing: 'easeOutQuint',
				d: this.initialShape,
			});
			// console.log()
		}

		initEvents() {
			this.mouseenterFn = (ev) => this.mouseTimeout = setTimeout(() => {
				this.isActive = true;
				this.changeShape(ev.target);
				clearTimeout(this.resetTimeout);
			}, 50);
			this.mouseleaveFn = () => {
				clearTimeout(this.mouseTimeout);
				if( !this.isActive ) return;
				this.isActive = false;

				this.resetTimeout = setTimeout(() => {
					this.resetShape();
				}, 300);
			};
			this.DOM.items.forEach((item) => {
				item.addEventListener('mouseenter', this.mouseenterFn);
				item.addEventListener('mouseleave', this.mouseleaveFn);
				item.addEventListener('touchstart', this.mouseenterFn);
				item.addEventListener('touchend', this.mouseleaveFn);
			});
		}
	};

	new Menu(document.querySelector('nav.menu'));
};
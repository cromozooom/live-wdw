var App = {
	elements: document.querySelectorAll("nav.navbar > div.collapse.navbar-collapse > ul > li"),
	state: {
		activeElement: null
	},
	InitPopper: function(element) {
		var referenceElement = element.querySelector("a.dropdown-toggle");
		var dropdown = element.querySelector("div.dropdown-menu");
		var dropdownCloseBtn = element.querySelector("div.row.mx-0.text-center");

		var popper = new Popper(referenceElement, dropdown, {
			placement: 'bottom',
			modifiers: {
			preventOverflow: {
				boundariesElement: 'viewport'
			}
		}
	});
		
		referenceElement.addEventListener("focusout", function(){ 
			this.closeDropdown(dropdown) 
		}.bind(this))
		
		referenceElement.addEventListener("click", function() {
		var dropdownDisplay = dropdown.style.display;
		var activeElement = this.state.activeElement;
		
		if (activeElement !== null) {
			activeElement.style.display = "none";
		}
		
		dropdown.style.display = dropdownDisplay === "none" || dropdownDisplay === "" 
			? "block" 
			: "none";
		
		this.state.activeElement = dropdown;

		popper.update();      

		}.bind(this)); 
		
		if (!!dropdownCloseBtn) {
		dropdownCloseBtn.addEventListener("click", function(){ 
			this.closeDropdown(dropdown) 
		}.bind(this))
		}
		
	},
	closeDropdown: function(dropdown) {
		dropdown.style.display = "none";
		this.state.activeElement = null;
	},
	init: function() {
		for(var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];
		this.InitPopper(element);
		}
	}
	} 

	App.init();
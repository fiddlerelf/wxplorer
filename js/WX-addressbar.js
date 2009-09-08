/*********************************************************************************
Copyright (C) 2007  Ryan Bowman

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

For any questions or comments contact ryan at fiddlerelf dot com
**********************************************************************************/
function WXAddressBar() {
	this.htmlRoot;
	this.xmlDoc;
	this.componentId;
	this.lookAndFeel = MODERN;
	this.history;
	
	this.setHtmlRoot = FCsetHtmlRoot;
	this.setComponentId = FCsetComponentId;
	this.setXmlDocument = FCsetXmlDocument;
	this.getImageDirectory = FCgetImageDirectory;
	
	this.searchForm = new WXSearchForm();
	this.searchForm.addressBar = this;
	
	this.addressForm = new WXAddressForm();
	this.addressForm.addressBar = this;
	this.lookAndFeel = MODERN;

	var _self = this;

	this.showAddressBar = function() {
		this.addressForm.setComponentId(this.componentId);
		this.addressForm.setHtmlRoot(this.addressForm.createAddressFormNode());
		this.addressForm.showAddressForm();
		this.htmlRoot.appendChild(this.addressForm.htmlRoot);
		
		
		this.searchForm.setComponentId(this.componentId);
		this.searchForm.setHtmlRoot(this.searchForm.createSearchFormNode());
		this.searchForm.showSearchForm();
		this.htmlRoot.appendChild(this.searchForm.htmlRoot);
	};
	
	this.setLookAndFeel = function(lookAndFeel) {
		this.addressForm.setLookAndFeel(lookAndFeel);
		this.searchForm.setLookAndFeel(lookAndFeel);
	};
	
	this.historyModified = function() {
		var hasPrevious = this.history.hasPrevious();
		var hasNext = this.history.hasNext();
		this.addressForm.historyModified(hasPrevious, hasNext);
	};
	
	this.setAddress = function(address) {
		this.addressForm.setAddress(address);
	};
	
	this.enableUp = function(enable) {
		this.addressForm.enableUp(enable);
	};

	this.addressBackClicked = function () {}
	this.addressForm.addressBackClicked = function() {
		_self.addressBackClicked();
	};

	this.addressForwardClicked = function() {}
	this.addressForm.addressForwardClicked = function() {
		_self.addressForwardClicked();
	};

	this.addressFormUpClicked = function() {}
	this.addressForm.addressFormUpClicked = function() {
		_self.addressFormUpClicked();
	};

	this.executeSearch = function() {}
	this.searchForm.executeSearch = function () {
		_self.executeSearch();
	};

}

/***************************************************/
/***************************************************/
function WXAddressForm() {
	this.htmlRoot;
	this.componentId;
	this.lookAndFeel = MODERN;
	this.addressField;
	this.addressBack;
	this.addressUp;
	this.addressForward;
	this.addressBarBackImage = "addressbar_back.png";
	this.addressBarForwardImage = "addressbar_forward.png";
	this.addressBarUpImage = "addressbar_up.png";
	this.addressBarBackDisabledImage = "addressbar_back_disabled.png";
	this.addressBarForwardDisabledImage = "addressbar_forward_disabled.png";
	this.addressBarUpDisabledImage = "addressbar_up_disabled.png";
	
	this.setHtmlRoot = FCsetHtmlRoot;
	this.setComponentId = FCsetComponentId;
	this.setLookAndFeel = FCsetLookAndFeel;
	this.getImageDirectory = FCgetImageDirectory;

	var _self = this;

	this.showAddressForm = function() {
		this.htmlRoot.appendChild(this.createAddressFormBack());
		this.htmlRoot.appendChild(this.createAddressFormForward());
		this.htmlRoot.appendChild(this.createAddressFormUp());
		this.htmlRoot.appendChild(this.createAddressFormAddressField());
	};

	this.createAddressFormNode = function() {
		var nodeElement = document.createElement("form");
		nodeElement.setAttribute("id", this.componentId + "_addressform");
		nodeElement.className = "addressform";
		var hiddenElement = document.createElement("input");
		hiddenElement.setAttribute("name", "componentId");
		hiddenElement.setAttribute("type", "hidden");
		hiddenElement.setAttribute("value", this.componentId);
		nodeElement.appendChild(hiddenElement);
		return nodeElement;
	};

	this.createAddressFormBack = function () {
		var nodeElement = document.createElement("input");
		nodeElement.setAttribute("id", this.componentId + "_addressformback");
		nodeElement.className = "addressformimage";
		nodeElement.setAttribute("src", this.getImageDirectory() + this.addressBarBackImage);
		nodeElement.setAttribute("type", "image");
		normAddEvent(nodeElement, "submit", returnFalse);
		normAddEvent(nodeElement, "submit", function () {
			_self.addressBackClicked();
		});
		normAddEvent(nodeElement, "change", returnFalse);
		normAddEvent(nodeElement, "reset", returnFalse);
		normAddEvent(nodeElement, "blur", returnFalse);
		normAddEvent(nodeElement, "click", returnFalse);
		normAddEvent(nodeElement, "click", function () {
			_self.addressBackClicked();
		});
		this.addressBack = nodeElement;
		return nodeElement;
	};

	this.addressBackClicked = function () {}

	this.createAddressFormForward = function() {
		var nodeElement = document.createElement("input");
		nodeElement.setAttribute("id", this.componentId + "_addressformforward");
		nodeElement.className = "addressformimage";
		nodeElement.setAttribute("src", this.getImageDirectory() + this.addressBarForwardImage);
		nodeElement.setAttribute("type", "image");
		normAddEvent(nodeElement, "submit", returnFalse);
		normAddEvent(nodeElement, "submit", function () {
			_self.addressForwardClicked();
		});
		normAddEvent(nodeElement, "change", returnFalse);
		normAddEvent(nodeElement, "reset", returnFalse);
		normAddEvent(nodeElement, "blur", returnFalse);
		normAddEvent(nodeElement, "click", returnFalse);
		normAddEvent(nodeElement, "click", function () {
			_self.addressForwardClicked();
		});
		this.addressForward = nodeElement;
		return nodeElement;
	};

	this.addressForwardClicked = function() {}

	this.createAddressFormUp = function() {
		var nodeElement = document.createElement("input");
		nodeElement.setAttribute("id", this.componentId + "_addressformup");
		nodeElement.className = "addressformimage";
		nodeElement.setAttribute("src", this.getImageDirectory() + this.addressBarUpImage);
		nodeElement.setAttribute("type", "image");
		normAddEvent(nodeElement, "submit", returnFalse);
		normAddEvent(nodeElement, "submit",  function () {
			_self.addressFormUpClicked();
		});
		normAddEvent(nodeElement, "change", returnFalse);
		normAddEvent(nodeElement, "reset", returnFalse);
		normAddEvent(nodeElement, "blur", returnFalse);
		normAddEvent(nodeElement, "click", returnFalse);
		normAddEvent(nodeElement, "click", function () {
			_self.addressFormUpClicked();
		});
		nodeElement.setAttribute("name", "addressformup");
		this.addressUp = nodeElement;
		return nodeElement;
	};

	this.addressFormUpClicked = function() {}

	this.createAddressFormAddressField = function() {
		var nodeElement = document.createElement("input");
		nodeElement.setAttribute("id", this.componentId + "_addressformaddressfield");
		nodeElement.className = "addressformfield";
		nodeElement.setAttribute("type", "text");
		nodeElement.disabled = true;
		this.addressField = nodeElement;
		return nodeElement;
	};

	this.historyModified = function (hasPrevious, hasNext)
	{
		this.enableBack(hasPrevious);
		this.enableForward(hasNext);
	};

	this.enableBack = function(enable) {
		var image;
		if (enable)
			image = this.getImageDirectory() + this.addressBarBackImage;
		else
			image = this.getImageDirectory() + this.addressBarBackDisabledImage;
		
		this.addressBack.setAttribute("src", image);
		this.addressBack.disabled = !enable;
	};

	this.enableForward = function(enable) {
		var image;
		if (enable)
			image = this.getImageDirectory() + this.addressBarForwardImage;
		else
			image = this.getImageDirectory() + this.addressBarForwardDisabledImage;
		
		this.addressForward.setAttribute("src", image);
		this.addressForward.disabled = !enable;
	};

	this.setAddress = function (address) {
		this.addressField.value = address;
	};

	this.enableUp = function(enable) {
		var image;
		if (enable)
			image = this.getImageDirectory() + this.addressBarUpImage;
		else
			image = this.getImageDirectory() + this.addressBarUpDisabledImage;
		
		this.addressUp.setAttribute("src", image);
		this.addressUp.disabled = !enable;
	};

}

/***************************************************/
/***************************************************/
function WXSearchForm() {
	this.htmlRoot;
	this.componentId;
	this.lookAndFeel = MODERN;
	this.addressBarSearchImage = "addressbar_search.png";
	
	this.searchSubmit;
	this.searchField;
	
	this.setHtmlRoot = FCsetHtmlRoot;
	this.setComponentId = FCsetComponentId;
	this.setXmlDocument = FCsetXmlDocument;
	this.setLookAndFeel = FCsetLookAndFeel;
	this.getImageDirectory = FCgetImageDirectory;

	this.showSearchForm = function () {
		this.htmlRoot.appendChild(this.createSearchFormSearchField());
		this.htmlRoot.appendChild(this.createSearchFormSubmit());
	};

	var _self = this;

	this.createSearchFormNode = function () {
		var nodeElement = document.createElement("form");
		nodeElement.setAttribute("id", this.componentId + "_searchform");
		nodeElement.className = "searchform";
		var hiddenElement = document.createElement("input");
		hiddenElement.setAttribute("name", "componentId");
		hiddenElement.setAttribute("type", "hidden");
		hiddenElement.setAttribute("value", this.componentId);
		nodeElement.appendChild(hiddenElement);
		return nodeElement;
	};

	this.createSearchFormSubmit = function () {
		var nodeElement = document.createElement("input");
		nodeElement.setAttribute("id", this.componentId + "_searchformsubmit");
		nodeElement.className = "searchformimage";
		nodeElement.setAttribute("type", "image");
		nodeElement.setAttribute("src", this.getImageDirectory() + this.addressBarSearchImage);
		normAddEvent(nodeElement, "submit", returnFalse);
		normAddEvent(nodeElement, "submit", function () {
			_self.executeSearch();
		});
		normAddEvent(nodeElement, "change", returnFalse);
		normAddEvent(nodeElement, "reset", returnFalse);
		normAddEvent(nodeElement, "blur", returnFalse);
		normAddEvent(nodeElement, "click", returnFalse);
		normAddEvent(nodeElement, "click", function () {
			_self.executeSearch();
		});
		nodeElement.setAttribute("name", "searchformsubmit");
		this.searchSubmit = nodeElement;
		return nodeElement;
	};

	this.createSearchFormSearchField = function() {
		var nodeElement = document.createElement("input");
		nodeElement.setAttribute("id", this.componentId + "__searchformsearchfield");
		nodeElement.className = "searchformfield";
		nodeElement.setAttribute("type", "text");
		normAddEvent(nodeElement, "click", returnFalse);
		nodeElement.setAttribute("name", "searchformsearchfield");
		this.searchField = nodeElement;
		return nodeElement;
	};

	this.executeSearch = function() {
		//
	}
}


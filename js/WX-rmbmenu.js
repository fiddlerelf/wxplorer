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
function WXContextMenu() {
	this.div;
	this.timerId;
	this.htmlRoot;
	this.menuExists = false;
	this.menuInfo = "testing";
	this.menuItemIdPrefix = "MENU";
	
	var _self = this;

	this.setHtmlRoot = function(htmlNode) {
		this.htmlRoot = htmlNode;
	};

	this.showContextMenu = function (e) {

		var evt = normGetEvent(e);

		if (this.preShowContextMenu(e)) {
			//this.htmlRoot.innerHTML = this.menuInfo;
	
			var windowWidth = getWidth(); 
			var divWidth = this.htmlRoot.offsetWidth;
			var topCoord = getMouseY(evt) + 0;
			var leftCoord = getMouseX(evt);
			
			if (leftCoord + divWidth > windowWidth) 
				leftCoord = windowWidth - (divWidth + 5); 
		
			leftCoord += 'px';
			topCoord += 'px';
		
			this.htmlRoot.style.left = leftCoord; 
			this.htmlRoot.style.top = topCoord; 
			
			this.htmlRoot.style.visibility = "visible";
			
			this.menuExists = true;
		}
	
	};

	this.preShowContextMenu = function(e) {
		/*var infoHtml;
		infoHtml = "<div class=\"contextmenuitem\"><a href=\"\">Edit</a></div>";
		infoHtml += "<div class=\"contextmenuitem\"><a href=\"\">Rename</a></div>";
		infoHtml += "<div class=\"contextmenuitem\"><a href=\"\">Delete</a></div>";
		this.setContextMenuInfo(infoHtml);
		return true;
		*/
	};

	this.hideContextMenu = function() {
		this.htmlRoot.style.visibility = "hidden"; 
		this.menuExists = false;
	};

	this.setContextMenuInfo = function(info) {
		this.menuInfo = info;
	};

	this.allowContextMenu = function(e) {
		return true;
	};

	this.clearMenuItems = function() {
		while (this.htmlRoot.firstChild) {
			this.htmlRoot.removeChild(this.htmlRoot.firstChild);
		}
	};

	this.addMenuItem = function (id, divText, fx) {
		d = document.createElement("div");
		d.className = "contextmenuitem";
		d.setAttribute("id", this.convertIdToMenuItemId(id));
		//div.innerHTML = divText;

		aEl = document.createElement("a");
		aEl.href = "http://www.fiddlerelf.com";
		aEl.target = "_blank";
		aEl.innerHTML = divText;

		normAddEvent(aEl, "mousedown", fx);
		
		d.appendChild(aEl);
		this.htmlRoot.appendChild(d);

		var stopPropFx = clickedStopPropogation;
		//normAddEvent(aEl, "click", clickedStopPropogation);
	};

	this.convertIdToMenuItemId = function(id) {
		return this.menuItemIdPrefix + "_" + id;
	}

	normAddEvent(document.body, "mousedown", function(e) {
		_self.hideContextMenu();
	});

	var returnFalseFx = returnFalse;
	normAddEvent(document.body, "contextmenu", returnFalseFx);
	normAddEvent(document.body, "contextmenu", function(e) {
		if (!_self.menuExists) { 
			if (_self.allowContextMenu(e)) {
				_self.showContextMenu(e);
			}
		}
		else {
			_self.hideContextMenu();
		}
		return false;
	});
	
}



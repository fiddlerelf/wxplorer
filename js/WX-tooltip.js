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
function WXToolTip() {
	this.div;
	this.timerId;
	this.htmlRoot;
	

	this.setHtmlRoot = function(htmlNode) {
		this.htmlRoot = htmlNode;
	};

	this.showToolTip = function (e) {
		var evt = normGetEvent(e);
		var _self = this;
		var windowWidth = getWidth(); 
		var divWidth = this.htmlRoot.offsetWidth;
		var topCoord = getMouseY(evt) + 25;
		var leftCoord = getMouseX(evt);
		
		if (leftCoord + divWidth > windowWidth) 
			leftCoord = windowWidth - (divWidth + 5); 
	
		leftCoord += 'px';
		topCoord += 'px';
	
		this.htmlRoot.style.left = leftCoord; 
		this.htmlRoot.style.top = topCoord; 
		
		this.timerId = setTimeout(function()
		{
			_self.htmlRoot.style.visibility = "visible";
		}, 1000);
	};

	this.hideToolTip = function() {
		if (this.timerId)
			clearTimeout(this.timerId);
		this.htmlRoot.style.visibility = "hidden"; 
	};

	this.setToolTipInfo = function(info) {
		this.htmlRoot.innerHTML = info;
	};
	
}



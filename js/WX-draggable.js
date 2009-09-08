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
function WXDraggable(htmlRoot)
{
	this.htmlRoot = htmlRoot;
	this.dragMode = false;
	
	this.setHtmlRoot = FCsetHtmlRoot;

	this.isDragMode = function() {
		return this.dragMode;
	};
	
	this.isDragging = function(xpos, ypos) {
		// extend me.
	};
	
	this.mouseMove = function(e) {
		evt = normGetEvent(e);
		if (this.dragMode) {
			this.isDragging(getMouseX(e), getMouseY(e));
		}
	};
	
	this.mouseUp = function(e) {
		this.dragMode = false;
	};
	
	this.mouseDown = function() {
		this.dragMode = true;
	};
}
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
function WXHistory() {
	this.nodes = new Array();
	this.index = 0;
	
	this.clear = function() {
		while(this.nodes.length > 0)
			this.nodes.pop();
	};

	this.next = function() {
		if (this.hasNext())
		{
			return this.nodes[++this.index];
		}
		else
			return null;
	};

	this.previous = function() {
		if (this.hasPrevious())
		{
			return this.nodes[--this.index];
		}
		else
			return null;
	};

	this.push = function(nodeId) {
		while (this.nodes.length > this.index + 1)
		{
			this.nodes.pop();
		}
		this.index = this.nodes.push(nodeId) - 1;
	};

	this.current = function() {
		return this.nodes[index];
	};

	this.length = function() {
		return this.nodes.length;
	};

	this.hasNext = function() {
		return this.index < (this.nodes.length - 1);
	};

	this.hasPrevious = function() {
		return this.index > 0;
	};
}


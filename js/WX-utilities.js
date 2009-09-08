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
/*function getDocument(document)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", document, false);
	xmlhttp.send('');
	return xmlhttp.responseXML;
}*/

function getDocument(document) {	
	var postbody = '';
	var t;
	var doc;
	var opt = {
		method: 'get',
		asynchronous: false,
		postBody: postbody,
		onSuccess: function(t) {
			var jsonText = t.responseText;
			doc = t.responseXML;
		}
	}
	
	new Ajax.Request(document, opt);

	return doc;
}

function normGetElementById(id)
{
	return document.getElementById(id);
}

function clickedStopPropogation(e)
{
	var evt = normGetEvent(e);
	if (e.stopPropagation)
	{
		evt.stopPropagation();
	}
	else if (window.event)
		evt.cancelBubble = true;
}

function normGetTargetElement(e)
{
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
		
	return targ;
}

function normGetEvent(evt)
{
	
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	//evt || window.event;
    return evt;
}

function normAddEvent(el, evName, evFx)
{
	
	if (el.addEventListener) 
	{
		el.addEventListener (evName, evFx, false);
	} 
	else if (el.attachEvent) 
	{
		var modifiedName = "on" + evName;
		el.attachEvent (modifiedName, evFx);
	} 
	else 
	{
		// huh?
		//el.onmouseover = myFunction;
		//el.onmouseout = myFunction;
	}
}

function returnFalse(e)
{
	if (e && e.preventDefault)
		e.preventDefault();
	return false;
}

function getHeight() 
{
	return document.documentElement.clientHeight;
}

function getWidth() 
{
	return window.innerWidth != null? window.innerWidth: document.body.clientWidth != null? document.body.clientWidth:null;
}

function getMouseX(evt) 
{
	if (evt.pageX) 
		return evt.pageX; 
	else if (evt.clientX)
		return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft); 
	else 
		return null;
}

function getMouseY(evt) 
{
	if (evt.pageY) 
		return evt.pageY; 
	else if (evt.clientY)
		return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); 
	else 
		return null;
}

function myresize(e)
{
	div = document.getElementById("treeview");
	if (div)
		div.style.height = (.95 * getHeight()) + "px";
	
	div = document.getElementById("listview");
	if (div)
		div.style.height = (.95 * getHeight()) + "px";
}

function createDocumentNode(nodeId) {
	var divEl = document.createElement("div");
	divEl.setAttribute("id", nodeId);
	return divEl;
}

function normGetPixels(pixels) {
	return pixels.replace("px", "");
}

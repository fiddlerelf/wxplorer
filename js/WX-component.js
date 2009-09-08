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

MODERN = "modern";
OLDSCHOOL = "oldschool";

MODERNLOOKANDFEELDIRECTORY = "images/modern/";
OLDSCHOOLLOOKANDFEELDIRECTORY = "images/oldschool/";


function WXComponent() {
	this.htmlRoot;
	this.xmlDoc;
	this.componentId;
	this.lookAndFeel;
	
	this.setHtmlRoot = FCsetHtmlRoot;
	this.setComponentId = FCsetComponentId;
	this.setXmlDocument = FCsetXmlDocument;
	this.setLookAndFeel = FCsetLookAndFeel;
	this.getImageDirectory = FCgetImageDirectory;
}

function FCsetHtmlRoot(htmlNode) {
	this.htmlRoot = htmlNode;
}

function FCsetComponentId(componentId) {
	this.componentId = componentId;
}

function FCsetXmlDocument(xmlDoc) {
	this.xmlDoc = xmlDoc;
}

function FCsetLookAndFeel(lookAndFeel) {
	this.lookAndFeel = lookAndFeel;
}

function FCgetImageDirectory() {
	if (this.lookAndFeel == MODERN)
		return MODERNLOOKANDFEELDIRECTORY;
	else
		return OLDSCHOOLLOOKANDFEELDIRECTORY;
}

function FCsetReadonly(htmlNode, readonly) {

}

function FCsetDisabled(htmlNode, disabled) {
	/* IE's implementation of this with images is SHITTY, so let's not use it for now... 
	var opacity;
	var alpha;
	if (disabled)
	{
		opacity = .5;
		alpha = 50;
	}
	else
	{
		opacity = 1;
		alpha = 100;
	}
	
	htmlNode.style.opacity =  opacity;
	htmlNode.style.filter =  "alpha(opacity=" + alpha + ")";
	htmlNode.disabled = disabled;
	*/
}

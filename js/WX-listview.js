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

listViewId = 0;
uniqueId = 0;

function WXListView() {

	this.LVPREFIX = "LV";
	
	this.htmlRoot;
	this.xmlDoc;
	this.listViewId = listViewId++;
	this.xmlDocImages = getDocument("xml/imageicons.xml");
	this.uniqueIdName = "id";
	this.collapsedFolderImage = "folder_closed.png";
	this.unknownFileImage = "unknown.png";
	this.lookAndFeel = MODERN;
	
	this.setLookAndFeel = FCsetLookAndFeel;
	this.getImageDirectory = FCgetImageDirectory;
	
	var _self = this;
	
	this.getCollapsedFolderImage = function() {
		return this.getImageDirectory() + this.collapsedFolderImage;
	};
	
	this.setXmlDocument = function(xmlDoc, uniqueIdName) {
		this.xmlDoc = xmlDoc;
		this.uniqueIdName = (!uniqueIdName ? "id" : uniqueIdName);
	};
	
	this.getXmlElementById = function(nodeId) {
		var nodes = this.xmlDoc.selectNodes("//*[@id = '" + nodeId + "']");
		return nodes[0];
	};
	
	this.getNormalizedNodeId = function(htmlNode) {
		var id = htmlNode.getAttribute("id");
		var prefix = this.listViewId + "_" + this.LVPREFIX;
		return id.subtring(prefix.length, id.length);
	};
	
	this.convertIdToListViewId = function(id) {
		return this.listViewId + "_" + this.LVPREFIX + id;
	};
	
	this.getListViewId = function() {
		return this.listViewId;
	};
	
	this.setListViewId = function(id) {
		this.listViewId = id;
	};
	
	this.populateListFromNode = function(xmlNode) {
		this.clearList();
		nodeId = xmlNode.getAttribute(this.uniqueIdName);
		var currentXmlNode = xmlNode;
		var children = currentXmlNode.childNodes;
		for (var i = 0; i < children.length; i++)
		{
			if (children[i].nodeType == 1)
			{
				var listNode = this.createListNode(children[i]);
				this.htmlRoot.appendChild(listNode);
			}	
		}
	};
	
	this.clearList = function() {
		while (this.htmlRoot.firstChild) {
			this.htmlRoot.removeChild(this.htmlRoot.firstChild);
		}
	};
	
	this.setHtmlListRoot = function(htmlNode) {
		this.htmlRoot = htmlNode;
	};
	
	this.getFileNameFromNode = function(xmlNode) {
		var name = xmlNode.getAttribute("name");
		if (name.length > 25)
			name = name.substr(0, 22) + "...";
		return name;
	};

	this.showToolTip = function(e) {};
	this.hideToolTip = function(e) {};
	this.setToolTipInfo = function(nodeId, name) {};
	
	this.createListNode = function(xmlNode) {
		var nodeId = xmlNode.getAttribute(this.uniqueIdName);
	
		// <div>
		var divEl = document.createElement("div");
		divEl.setAttribute("id", this.convertIdToListViewId(nodeId));
		divEl.className = "listnode";
		
		// <nobr>
		var noBREl = document.createElement("nobr");
		
		// <img>
		var imgIconEl = document.createElement("img");
		imgIconEl.className = "listnode";
		var imgIconFile
		if (xmlNode.nodeName == "directory")
			imgIconFile = this.getCollapsedFolderImage();
		else
			imgIconFile = this.getImageIcon(xmlNode);
		imgIconEl.setAttribute("src", imgIconFile);
		imgIconEl.setAttribute("id", this.listViewId + "_LVI" + nodeId);
		
		// <span>
		var spanEl = document.createElement("span");
		spanEl.className = "listnode";
		spanEl.innerHTML = this.getFileNameFromNode(xmlNode);
		spanEl.setAttribute("id", this.listViewId + "_LVS" + nodeId);
			
		// <a>
		var aEl = document.createElement("a");
		aEl.className = "listnode";
		aEl.setAttribute("target", "_blank");
		aEl.setAttribute("id", this.listViewId + "_LVL" + nodeId);
		if (xmlNode.nodeName != "directory") {
			aEl.href = xmlNode.getAttribute("link");
		}
		else {
			aEl.href = "";
			var returnFalseFx = returnFalse;
			normAddEvent(aEl, "click", returnFalseFx);
			normAddEvent(aEl, "click", function () {
				_self.listNodeDoubleClicked(nodeId, "test");
			});	
		}
		var stopPropFx = clickedStopPropogation;
		normAddEvent(aEl, "mouseover", clickedStopPropogation);
		normAddEvent(imgIconEl, "mouseover", clickedStopPropogation);
		normAddEvent(spanEl, "mouseover", clickedStopPropogation);
		normAddEvent(aEl, "mouseout", clickedStopPropogation);
		normAddEvent(imgIconEl, "mouseout", clickedStopPropogation);
		normAddEvent(spanEl, "mouseout", clickedStopPropogation);
		
		normAddEvent(divEl, "mouseover", clickedStopPropogation);
		normAddEvent(spanEl, "mouseover", function (e) {
			_self.setToolTipInfo(nodeId, "listview");
		});
		normAddEvent(spanEl, "mouseover", function (e) {
			_self.showToolTip(e);
		});
		normAddEvent(spanEl, "mouseout", clickedStopPropogation);
		normAddEvent(spanEl, "mouseout", function (e) {
			_self.hideToolTip(e);
		});
		normAddEvent(imgIconEl, "mouseover", function (e) {
			_self.setToolTipInfo(nodeId, "listview");
		});
		normAddEvent(imgIconEl, "mouseover", function (e) {
			_self.showToolTip(e);
		});
		normAddEvent(imgIconEl, "mouseout", clickedStopPropogation);
		normAddEvent(imgIconEl, "mouseout", function (e) {
			_self.hideToolTip(e);
		});
		
		// rest of stuff...
		aEl.appendChild(imgIconEl);
		aEl.appendChild(spanEl);
		noBREl.appendChild(aEl);
		divEl.appendChild(noBREl);
		
		return divEl;
		
	};
	
	this.createListNodeDiv = function(nodeId) {
		//to do
	};
	
	this.createListNodeImg = function(nodeId) {
		//to do
	};
	
	this.createListNodeA = function(nodeId) {
		//to do
	};
	
	this.createListNodeSpan = function(nodeId) {
		//to do
	};
	
	this.createListNodeToolTip = function(nodeId) {
		//to do
	};
	
	this.getImageIcon = function(currentXmlElement) {
		var fileExt = currentXmlElement.getAttribute("fileext");
		if (fileExt != '')
		{
			var nodes = this.xmlDocImages.selectNodes("//*[@fileext = '" + fileExt +	"']");
			if (nodes.length > 0)
			{
				return this.getImageDirectory() + nodes[0].getAttribute("name");
			}
		}
		
		return this.getImageDirectory() + this.unknownFileImage;
	};
	
	this.listNodeDoubleClicked = function(nodeId, clickedType) {
		this.listNodeDoubleClickedExt(nodeId, clickedType);
	};
	
	this.listNodeDoubleClickedExt = function(nodeId, clickedType) {
	
	};
	
	this.getToolTipInfo = function(nodeId) {
		var fileInfo = new WXFileInfo();
		var xmlNode = this.getXmlElementById(nodeId);
		
		fileInfo.fileName = xmlNode.getAttribute("name");
		fileInfo.fileSize = xmlNode.getAttribute("size");
		fileInfo.dateLastModified = xmlNode.getAttribute("lastmodified");
		fileInfo.dateLastAccessed = xmlNode.getAttribute("lastaccessed");
		fileInfo.fileType = xmlNode.getAttribute("type");
		fileInfo.imageType = xmlNode.getAttribute("imagetype");
		fileInfo.imageWidth = xmlNode.getAttribute("imagewidth");
		fileInfo.imageHeight = xmlNode.getAttribute("imageheight");
		
		return this.buildToolTipHtml(xmlNode, fileInfo);	
	};
	
	this.buildToolTipHtml = function(xmlNode, fileInfo) {	
		var info = "<div class=\"ttfilename\">" + fileInfo.fileName + "</div>";
		if (fileInfo.imageType != '')
		{
			var link = xmlNode.getAttribute("link");
			var imageDimensions = this.getResizeImageDimensions(fileInfo);
			info += "<div class=\"ttfileimage\"><img class=\"ttfileimage\" src=\"" + link + "\" ";
			info += "width=\"" + imageDimensions[0] + "\"";
			info += "height=\"" + imageDimensions[1] + "\"";
			info += "</div>";
		}
		if (fileInfo.fileType == "file")
			info += "<div class=\"ttfilesize\">Size: " + fileInfo.fileSize + " bytes</div>";
		info += "<div class=\"ttdatelastmodified\">Last Modified: " + fileInfo.dateLastModified + "</div>";
		info += "<div class=\"ttdatelastaccessed\">Last Accessed: " + fileInfo.dateLastAccessed + "</div>";
			
		return info;
	}
	
	this.getResizeImageDimensions = function(fileInfo) {
		var width = fileInfo.imageWidth;
		var height = fileInfo.imageHeight;
		var limit = 200;
		var percentage;
		
		if (width > 200 || height > 200)
		{
			if (width > height) 
			{
				percentage = (limit / width);
			} 
			else 
			{
				percentage = (limit / height);
			} 
			
			width = Math.round(width * percentage);
			height = Math.round(height * percentage); 
		}
		
		var dimensions = new Array();
		dimensions.push(width);
		dimensions.push(height);
		
		return dimensions;
	};
}

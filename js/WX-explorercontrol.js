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

var explorerControlId = 0;
var DIRECTORY = "directory";
var	FILE = "file";

function WXExplorer(htmlRootName, xmlDocName, createIds, uniqueIdName, lookAndFeel) {

	this.xmlDoc;
	this.uniqueIdName = "id";
	//this.htmlRoot = document.getElementById(htmlRootName);
	//this.setHtmlRoot(htmlRootName);
	this.componentId = explorerControlId++;
	this.lookAndFeel = lookAndFeel;
	this.draggables = new Array();

	var _self = this;

	this.registerDraggable = function(draggable) {
		this.draggables.push(draggable);
	};

	this.setLookAndFeel = function(lookAndFeel) {
		this.lookAndFeel = lookAndFeel;
		this.addressBar.setLookAndFeel(lookAndFeel);
		this.treeView.setLookAndFeel(lookAndFeel);
		this.listView.setLookAndFeel(lookAndFeel);
	};

	this.getComponentId = function() {
		return this.componentId;
	};

	this.createDocumentNode = function(nodeId) {
		var divEl = document.createElement("div");
		divEl.setAttribute("id", nodeId);
		return divEl;
	};

	this.createTreeViewNode = function(nodeId) {
		var nodeElement = this.createDocumentNode("treeview");
		return nodeElement;
	};

	this.createListViewNode = function(nodeId) {
		var nodeElement = this.createDocumentNode("listview");
		return nodeElement;
	};

	this.createToolTipNode = function(nodeId) {
		var nodeElement = this.createDocumentNode(this.componentId + "_tooltip");
		nodeElement.className = this.getToolTipClass();
		return nodeElement;
	};

	this.createContextMenuNode = function(nodeId) {
		var nodeElement = this.createDocumentNode(this.componentId + "_contextmenu");
		nodeElement.className = this.getContextMenuClass();
		return nodeElement;
	}

	this.getToolTipClass = function() {
		if (this.lookAndFeel == MODERN)
			return "tooltipmodern";
		else
			return "tooltipoldschool";
	};

	this.getContextMenuClass = function() {
		if (this.lookAndFeel == MODERN)
			return "contextmenumodern";
		else
			return "contextmenuoldschool";
	};

	this.createViewWrapperNode = function(nodeId) {
		var nodeElement = this.createDocumentNode(this.componentId + "_viewwrapper");
		nodeElement.className = "viewwrapper";
		return nodeElement;
	};

	this.createViewWrapper2Node = function(nodeId) {
		var nodeElement = this.createDocumentNode(this.componentId + "_viewwrapper2");
		nodeElement.className = "viewwrapper2";
		return nodeElement;
	};

	this.createAddressBarNode = function(nodeId) {
		var nodeElement = this.createDocumentNode(this.componentId + "_addressbar");
		nodeElement.className = "addressbar";
		return nodeElement;
	};

	this.createViewSliderNode = function(nodeId) {
		var nodeElement = this.createDocumentNode(this.componentId + "_viewslider");
		nodeElement.className = "viewslider";
		return nodeElement;
	};

	this.createUniqueIds = function(xmlEl, idName) {
		var xmlChildren = xmlEl.childNodes;

		for (var i = 0; i < xmlChildren.length; i++)
		{
			if (xmlChildren[i].nodeType == 1)
			{
				this.setUniqueId(xmlChildren[i], idName);
				if (this.nodeHasChildElements(xmlChildren[i]))	
					this.createUniqueIds(xmlChildren[i], idName);
			}
		}
	};

	this.setUniqueId = function(xmlEl, idName) {
		xmlEl.setAttribute(idName, uniqueId++);
	};

	this.setHtmlRoot = function(nodeId) {
		this.htmlRoot = document.getElementById(nodeId);
	};

	this.setHtmlTreeRoot = function(HtmlEl) {
		this.treeView.setHtmlTreeRoot(HtmlEl);
	};

	this.setHtmlListRoot = function(HtmlEl) {
		this.listView.setHtmlListRoot(HtmlEl);
	};

	this.setXmlDocument = function(xmlDoc, createUniqueId, uniqueIdName) {
		xmlDoc.setProperty("SelectionLanguage", "XPath");
		this.xmlDoc = xmlDoc;
		
		this.createUniqueIds(this.xmlDoc, this.uniqueIdName);
		this.treeView.setXmlDocument(this.xmlDoc, createUniqueId, uniqueIdName);
		this.listView.setXmlDocument(this.xmlDoc, uniqueIdName);
		this.searchService.setXmlDocument(this.xmlDoc);
	};

	this.getTreeViewId = function() {
		return this.treeView.getTreeViewId();
	};

	this.getListViewId = function() {
		return this.listView.getListViewId();
	};

	this.showExplorer = function() {
		this.htmlRoot.appendChild(this.addressBar.htmlRoot);
		this.addressBar.showAddressBar();
		this.htmlRoot.appendChild(this.viewWrapper);
		this.viewWrapper.appendChild(this.viewWrapper2);
		this.viewWrapper2.appendChild(this.treeView.htmlRoot);
		this.viewWrapper2.appendChild(this.viewSlider);
		this.viewWrapper2.appendChild(this.listView.htmlRoot);
		this.viewWrapper2.appendChild(this.toolTip.htmlRoot);
		this.viewWrapper2.appendChild(this.contextMenu.htmlRoot);
		this.treeView.createTree();
		// remember to fix this up above! change all this crap actually!!
		this.toolTip.htmlRoot.className = this.getToolTipClass();

	};

	this.nodeHasChildElements = function(node) {
		var children = node.childNodes;
		for (var i = 0; i < children.length; i++)
		{
			if (children[i].nodeType == 1)
				return true;
		}
		return false;
	};

	this.showToolTip = function(e) {
		this.toolTip.showToolTip(e);
	};

	this.hideToolTip = function() {
		this.toolTip.hideToolTip();
	};

	this.setToolTipInfo = function(nodeId, componentName) {
		var component;
		switch (componentName)
		{
			case "listview":
			{
				component = this.listView;
			}
			break;
			case "treeview":
			{
				component = this.treeView;
			}
			break;
		}
		
		var fileInfo = component.getToolTipInfo(nodeId);		
		this.toolTip.setToolTipInfo(fileInfo);
	};

	this.executeSearch = function() {
		var nodes;
		var searchString = this.addressBar.searchForm.searchField.value;
		if (searchString && searchString != '')
		{
			nodes = this.searchService.search(searchString);
			this.listView.clearList();
			if (nodes.length > 0)
			{
				for (var i = 0; i < nodes.length; i++)
				{
					this.listView.htmlRoot.appendChild(this.listView.createListNode(nodes[i]));
				}
			}
			else
			{
				var spanEl = document.createElement("span");
				spanEl.innerHTML = "<em>Your search did not return any results.</em>";
				this.listView.htmlRoot.appendChild(spanEl);
			}
		}
	};

	this.moveUpOneNode = function(e) {
		this.treeView.moveUpOneNode();
	};

	this.addressBackClicked = function(e) {
		var nodeId = this.history.previous();
		this.addressBar.historyModified();
		this.treeView.gotoNode(nodeId);
	};

	this.addressForwardClicked = function(e) {
		var nodeId = this.history.next();
		this.addressBar.historyModified();
		this.treeView.gotoNode(nodeId);
	};

	this.mouseDown = function(e) {
		var evt = normGetEvent(e);
		var targetElement = normGetTargetElement(e);
		var nodeId = targetElement.getAttribute("id");
		for (var i = 0; i < this.draggables.length; i++)
		{
			if (this.draggables[i].htmlRoot.getAttribute("id") == nodeId)
			{
				this.draggables[i].mouseDown();
				return;
			}
		}
	};

	this.mouseUp = function(e) {
		for (var i = 0; i < this.draggables.length; i++)
		{
			this.draggables[i].mouseUp();
		}
	};

	this.mouseMove = function(e) {
		for (var i = 0; i < this.draggables.length; i++)
		{
			this.draggables[i].mouseMove(e);
		}
	};

	this.resizeForSeparator = function() {
		var containerWidth = this.htmlRoot.offsetWidth;
		var containerLeft = this.htmlRoot.style.left;
		var containerRight = containerWidth + containerLeft

		var xpos = normGetPixels(this.viewSlider.style.left)
		var treeViewPercentage = 100 * ((xpos - containerLeft - 10) / containerWidth);
		var listViewPercentage = 100 * ((containerRight - xpos + this.viewSlider.offsetWidth) / containerWidth);
		this.treeView.htmlRoot.style.width = treeViewPercentage + "%";
		this.listView.htmlRoot.style.width = listViewPercentage + "%";

	};

	this.containerResize = function(e) {
		var treeViewNode = this.treeView.htmlRoot;
		var listViewNode = this.listView.htmlRoot;
		var addressBarNode = this.addressBar.htmlRoot;
		var addressFormNode = this.addressBar.addressForm.htmlRoot;
		var searchFormNode = this.addressBar.searchForm.htmlRoot;
		var addressFieldNode = this.addressBar.addressForm.addressField;
		var containerWidth = this.htmlRoot.offsetWidth;
		var containerLeft = this.htmlRoot.style.left;

		var addressFormWidth = addressFormNode.offsetWidth;
		var addressFieldWidth = addressFieldNode.offsetWidth;
		var addressButtonsWidth = 100; // for shits sake
		
		var searchFormWidth = searchFormNode.offsetWidth;
		var targetAddressFormWidth = containerWidth - searchFormWidth;
		
		var searchFormPercentage = Math.round((searchFormWidth )/containerWidth * 100)
		var newAddressFormPercentage = 95 - searchFormPercentage;
		if (newAddressFormPercentage > 0)
		{
			addressFormNode.style.width = newAddressFormPercentage + "%";
		}
		
		var newAddressFieldWidth = (100 - Math.round(addressButtonsWidth/targetAddressFormWidth * 100));
		if (newAddressFieldWidth > 0)
			addressFieldNode.style.width = newAddressFieldWidth + "%";
			
		if (containerLeft == "")
			containerLeft = 0;
		
		var viewHeight = (.95 * (getHeight() - searchFormNode.offsetHeight - 20))
		if (treeViewNode)
			treeViewNode.style.height = viewHeight + "px";
		
		if (listViewNode)
			listViewNode.style.height = viewHeight + "px";
			
		if (this.viewSlider)
		{
			this.viewSlider.style.height = viewHeight + "px";
			this.viewSlider.style.left = this.htmlRoot.offsetWidth - listViewNode.offsetWidth + "px";
			this.resizeForSeparator();	
		}
		
	};

	this.setHtmlRoot(htmlRootName);

	//extend treeview a little
	this.treeView = new WXTreeView();
	this.treeView.setTreeViewId(this.componentId);
	var treeViewNode = this.createTreeViewNode();
	this.treeView.setHtmlTreeRoot(treeViewNode);
	this.treeView.openTreeNodeExt = function(xmlNode) {
		_self.listView.populateListFromNode(xmlNode);
		_self.addressBar.setAddress(this.getNodePath(xmlNode));
		_self.addressBar.enableUp(xmlNode != this.xmlDoc.documentElement);
	};
	this.treeView.addToHistoryExt = function(nodeId) {
		_self.addressBar.historyModified();
	};
	this.treeView.treeNodeClickedExt = function(nodeId, clickedType) {
		_self.toolTip.hideToolTip();
	};

	//extend listview a little
	this.listView = new WXListView();
	this.listView.setListViewId(this.componentId);
	var listViewNode = this.createListViewNode();
	this.listView.setHtmlListRoot(listViewNode);
	this.listView.listNodeDoubleClickedExt = function(nodeId, clickedType) {
		_self.toolTip.hideToolTip();
		_self.treeView.treeNodeClicked(nodeId, "treenodeicon");
	};
	this.listView.showToolTip = function(e) {
		_self.showToolTip(e);
	};
	this.listView.hideToolTip = function(e) {
		_self.hideToolTip(e);
	};
	this.listView.setToolTipInfo = function(nodeId, name) {
		_self.setToolTipInfo(nodeId, name);
	};

	this.addressBar = new WXAddressBar();
	this.addressBar.setComponentId(this.componentId);
	var addressBarNode = this.createAddressBarNode();
	this.addressBar.setHtmlRoot(addressBarNode);
	this.addressBar.explorer = this;

	this.addressBar.executeSearch = function () {
		_self.executeSearch();
	};

	this.addressBar.addressForwardClicked = function () {
		_self.addressForwardClicked();
	};

	this.addressBar.addressFormUpClicked = function () {
		_self.moveUpOneNode();
	};

	this.addressBar.addressBackClicked = function () {
		_self.addressBackClicked();
	};

	//create the tooltip node
	this.toolTip = new WXToolTip();
	var toolTipNode = this.createToolTipNode();
	this.toolTip.setHtmlRoot(toolTipNode);

	//context menu
	this.contextMenu = new WXContextMenu();
	var contextMenuNode = this.createContextMenuNode();
	this.contextMenu.setHtmlRoot(contextMenuNode);

	this.contextMenu.preShowContextMenu = function(e) {

		this.clearMenuItems();
		this.addMenuItem("1", "Edit", function (e) {
			_self.processEdit(e);
		});

		this.addMenuItem("1", "Rename", function (e) {
			_self.processRename(e);
		});
		//var infoHtml;
		//infoHtml = "<div class=\"contextmenuitem\"><a href=\"\">Edit</a></div>";
		//infoHtml += "<div class=\"contextmenuitem\"><a href=\"\">Rename</a></div>";
		//infoHtml += "<div class=\"contextmenuitem\"><a href=\"\">Delete</a></div>";
		//this.setContextMenuInfo(infoHtml);
		return true;
	};

	this.processAction = function(e, actionType) {
		var postbody = this.buildPostBody(actionType);
		var rt = true;
		var t;
		var opt = {
			method: 'post',
			asynchronous: false,
			postBody: postbody,
			onSuccess: function(t) {
				//var jsonText = t.responseText;
				//var ret = eval('(' + jsonText + ')');
				//if (!ret.rc) {
				//	processMessage(ret.message);
				//}
				//rt = ret.rc;
				alert(t.responseText);
			}
		}
		
		new Ajax.Request('php/process.php', opt);
	
		return rt;
	}

	this.processEdit = function (e) {
		this.processAction(e, "wxedit");
	}

	this.processRename = function (e) {
		this.processAction(e, "wxrename");
	}

	this.processDelete = function (e) {
		this.processAction(e, "wxdelete");
	}

	this.processNewFile = function (e) {
		this.processAction(e, "wxnewfile");
	}

	this.processNewDirectory = function (e) {
		this.processAction(e, "wxnewdir");
	}

	this.buildPostBody = function(e, actionType) {
		/*
		var amp = '';
		var ret = '';
		var eq = '=';
		for (var i = 0; i < this.selectControls.length; i++) {
			ret += amp + this.selectControls[i].getSelectedName() + eq + this.selectControls[i].getSelectedValue();
			amp = '&';
			ret += amp + this.selectControls[i].getSelectedName() + eq + this.selectControls[i].getSelectedValue();
		}
		*/
		var ret = '';
		var eq = '=';
		ret += "action" + eq + actionType;
		return ret;
	}

	this.viewWrapper = this.createViewWrapperNode();
	this.viewWrapper2 = this.createViewWrapper2Node();
	this.viewSlider = this.createViewSliderNode();

	this.viewSlider = this.createViewSliderNode()
	this.viewSliderDrag = new WXDraggable(this.viewSlider);
	this.viewSliderDrag.isDragging = function(xpos, ypos) {
		var containerWidth = _self.htmlRoot.offsetWidth;
		var containerLeft = _self.htmlRoot.style.left;
		var containerRight = containerWidth + containerLeft
		var leftBound = containerLeft + 200;
		var rightBound = containerRight - 300;
		
		if ((xpos > leftBound) && (xpos < rightBound))
		{
			this.htmlRoot.style.left = xpos + "px";
			var treeViewPercentage = 100 * ((xpos - containerLeft - 10) / containerWidth);
			var listViewPercentage = 100 * ((containerRight - xpos + this.htmlRoot.offsetWidth) / containerWidth);
			_self.treeView.htmlRoot.style.width = treeViewPercentage + "%";
			_self.listView.htmlRoot.style.width = listViewPercentage + "%";
		}
	};

	this.registerDraggable(this.viewSliderDrag);

	this.searchService = new WXSearch();
	this.searchService.explorer = this;

	this.history = new WXHistory();
	this.treeView.history = this.history;
	this.addressBar.history = this.history;

	if (!isIe)
	{
		document.captureEvents(Event.MOUSEMOVE | Event.MOUSEDOWN | Event.MOUSEUP);
		window.captureEvents(Event.RESIZE); 
	}
	document.onmousemove = function(e) {
		var evt = normGetEvent(e);
		_self.mouseMove(evt);
	};
	document.onmousedown = function(e) {
		var evt = normGetEvent(e);
		_self.mouseDown(evt);
	};
	document.onmouseup = function(e) {
		var evt = normGetEvent(e);
		_self.mouseUp(evt);
	};

	window.onresize =  function(e) {
		var evt = normGetEvent(e);
		_self.containerResize(evt);
	};

	var stopPropFx = clickedStopPropogation;
	normAddEvent(document, "contextmenu", clickedStopPropogation);

	this.setXmlDocument(getDocument(xmlDocName, true, this.uniqueIdName));
	this.showExplorer();
	this.containerResize();
	

}

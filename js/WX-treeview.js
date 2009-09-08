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

treeViewId = 0;
uniqueId = 0;

function WXTreeView() {
	this.TREESTATETYPE = "treestate";
	this.TREENODEICONTYPE = "treenodeicon";
	this.TREENODESPANTYPE = "treenodespan";
	this.DIRECTORY = "directory";
	this.FILE = "file";
	this.TVPREFIX = "tv";

	this.xmlDoc;
	this.htmlRoot;
	//this.createUniqueIds;
	this.uniqueIdName = "id";
	this.useFileImages = true;
	this.collapsedFolderImage = "folder_closed.png";
	this.expandedFolderImage = "folder_open.png";
	this.leafImage = "unknown.png";
	this.expandedImage = "expanded_icon.png";
	this.collapsedImage = "collapsed_icon.png";
	this.blankImage = "blank.png";
	this.treeViewId = treeViewId++;
	this.overFlow = "auto";
	this.currentNodeId;
	this.openNodeId;
	this.rootNodeIsRegularNode = false;
	this.rootNodeId = null;
	this.lookAndFeel = MODERN;
	this.history;

	this.setLookAndFeel = FCsetLookAndFeel;
	this.getImageDirectory = FCgetImageDirectory;

	var _self = this;

	this.createTree = function() {
		if (this.xmlDoc && this.htmlRoot)
		{
			/*
			if (this.createUniqueIds)
			{
				this.createUniqueIds(this.xmlDoc, this.uniqueIdName);
			}
			*/
			
			this.htmlRoot.style.overflow = this.overFlow;
			
			if (this.rootNodeIsRegularNode)
			{
				this.buildTreeLevel(this.htmlRoot, this.xmlDoc.documentElement);
			}
			else
			{
				this.buildRootNode(this.htmlRoot, this.xmlDoc.documentElement);
				var nodeId = this.xmlDoc.documentElement.getAttribute("id");
				this.rootNodeId = nodeId;
				this.addToHistory(nodeId);
				var htmlNode = this.getHtmlElementById(nodeId);
				this.buildTreeLevel(htmlNode, this.xmlDoc.documentElement);
				this.openTreeNode(this.xmlDoc.documentElement);
			}
		}
		
	}

	/*
	this.setLookAndFeel(lookAndFeel) {
		this.lookAndFeel = lookAndFeel;
	}
	*/

	this.getCurrentNodeClass = function() {
		if (this.lookAndFeel == MODERN)
			return "treenodecurrentmodern";
		else
			return "treenodecurrentoldschool";
	};

	this.getCollapsedFolderImage = function() {
		return this.getImageDirectory() + this.collapsedFolderImage;
	};

	this.getExpandedFolderImage = function() {
		return this.getImageDirectory() + this.expandedFolderImage;
	};

	this.getCollapsedImage = function() {
		return this.getImageDirectory() + this.collapsedImage;
	};

	this.getExpandedImage = function() {
		return this.getImageDirectory() + this.expandedImage;
	};

	this.getDefaultLeafImage = function() {
		return this.getImageDirectory() + this.leafImage;
	};

	this.getBlankImage = function() {
		return this.getImageDirectory() + this.blankImage;
	}

	/*
	this.getImageDirectory = function() {
		if (this.lookAndFeel == MODERN)
			return MODERNLOOKANDFEELDIRECTORY;
		else
			return OLDSCHOOLLOOKANDFEELDIRECTORY;
	}
	*/

	this.setHtmlTreeRoot = function(htmlNode) {
		this.htmlRoot = htmlNode;
	};

	this.setXmlDocument = function(XmlDoc, createUniqueId, uniqueIdName) {
		this.xmlDoc = XmlDoc;
		this.createUniqueId = (!createUniqueId ? true : createUniqueId);
		this.uniqueIdName = (!uniqueIdName ? "id" : uniqueIdName);
	};

	this.setCollapsedFolderImage = function(collapsedFolderImage) {
		this.collapsedFolderImage = collapsedFolderImage;
	};

	this.setExpandedFolderImage = function(expandedFolderImage) {
		this.expandedFolderImage = expandedFolderImage;
	};

	this.setLeafImage = function(leafImage) {
		this.leafImage = leafImage;
	};

	this.useFileImages = function(useFileImages) {
		this.useFileImages = ((useFileImages == null) ? true : useFileImages);
	};

	this.getTreeViewId = function() {
		return this.treeViewId;
	};

	this.setTreeViewId = function(id) {
		this.treeViewId = id;
	};

	this.setOverFlow = function(overFlow) {
		this.overFlow = ((overFlow == null) ? "auto" : overFlow);;
	};

	this.getCurrentNodeId = function() {
		return this.currentNodeId;
	};

	this.setCurrentNodeId = function(nodeId) {
		this.currentNodeId = nodeId;
	};

	this.getOpenNodeId = function() {
		return this.openNodeId;
	};

	this.setOpenNodeId = function(nodeId) {
		this.openNodeId = nodeId;
	};

	this.getXmlElementById = function(nodeId) {
		//var nodes = this.xmlDoc.selectNodes("//*[@id = '" + nodeId + "']");
		//return nodes[0];
		return this.xmlDoc.selectSingleNode("//*[@id = '" + nodeId + "']");
	};

	this.getHtmlElementById = function(nodeId) {
		return document.getElementById(this.convertIdToTreeViewId(nodeId));
	}

	/*
	this.createUniqueIds(XmlEl, idName) {
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

	this.setUniqueId(XmlEl, idName) {
		XmlEl.setAttribute(idName, uniqueId++);
	}
	*/

	this.getNormalizedNodeId = function(htmlNode) {
		var id = htmlNode.getAttribute("id");
		var prefix = this.treeViewId + "_" + this.TVPREFIX;
		return id.substring(prefix.length, id.length);
	};

	this.convertIdToTreeViewId = function(id) {
		return this.treeViewId + "_" + this.TVPREFIX + id;
	};

	this.buildRootNode = function(htmlRoot, xmlDoc) {
		this.appendNode(htmlRoot, xmlDoc, true);
	};

	this.buildTreeLevel = function(parenthtmlElement, currentXmlElement) {
		var xmlChildren = currentXmlElement.childNodes;
		var htmlElement;

		for (var i = 0; i < xmlChildren.length; i++)
		{
			if (xmlChildren[i].nodeName == "directory")
			{
				htmlElement = this.appendNode(parenthtmlElement, xmlChildren[i]);
			}
		}	
	};

	this.buildTree = function(htmlEl, xmlEl) {
		var xmlChildren = xmlEl.childNodes;
		var htmlElement;
		
		for (var i = 0; i < xmlChildren.length; i++)
		{
			if (xmlChildren[i].nodeName == "directory")
			{
				htmlElement = this.appendNode(htmlEl, xmlChildren[i]);
				if (this.nodeHasChildElements(xmlChildren[i]))	
					this.buildTree(htmlElement, xmlChildren[i]);
			}		
		}	
	};

	this.nodeHasSubdirectories = function(xmlNode) {
		var nodeId = xmlNode.getAttribute(this.uniqueIdName);
		nodeList = xmlNode.getElementsByTagName("directory");
		if (nodeList.length > 0 )
			return true;
		else
			return false;
	}


	this.treeNodeClicked = function(nodeId, clickedType) {
		var xmlNode = this.getXmlElementById(nodeId);
		var clickedHtmlNode = this.getHtmlElementById(nodeId);
		switch (clickedType)
		{
			case this.TREESTATETYPE:
			{
				if (this.nodeHasSubdirectories(xmlNode))
				{
					var subNodes = this.getImmediateSubdirectories(xmlNode);
					if (subNodes.length > 0)
					{
						var htmlSubNode = this.getHtmlElementById(subNodes[0].getAttribute(this.uniqueIdName));
						if (!htmlSubNode || this.treeNodeIsHidden(this.getNormalizedNodeId(htmlSubNode)))
						{
							this.expandTreeNode(xmlNode);
						}
						else
						{
							this.collapseTreeNode(xmlNode);
						}
					}
				}
			}
			break;
			case this.TREENODEICONTYPE: case this.TREENODESPANTYPE:
			{
				this.openTreeNode(xmlNode);
				if (this.nodeHasSubdirectories(xmlNode))
				{
					this.expandTreeNode(xmlNode);
				}
				this.addToHistory(nodeId);
			}
			break;
			default:
			return;
			break;
		}
		
		this.setCurrentNodeId(nodeId);
		
		this.treeNodeClickedExt(nodeId, clickedType)
	};

	this.treeNodeClickedExt = function(nodeId, clickedType) {

	};

	this.getNodeSpan = function(xmlNode) {
		var nodeId = xmlNode.getAttribute(this.uniqueIdName);
		var htmlNode = this.getHtmlElementById(nodeId);
		var children = htmlNode.childNodes;
		children = children[0].childNodes;
		for (var i = 0; i < children.length; i++)
		{
			if (children[i].nodeName.toLowerCase() == "span")
				return children[i];
		}
		
		return null;
	};

	this.moveUpOneNode = function() {
		if (this.currentNodeId)
		{
			var xmlNode = this.getXmlElementById(this.currentNodeId);
			var nodeId = xmlNode.getAttribute(this.uniqueIdName);
			if (xmlNode.parentNode && !this.isRootNode(nodeId))
			{
				var xmlParent = xmlNode.parentNode
				var nodeId = xmlParent.getAttribute(this.uniqueIdName);
				this.openTreeNode(xmlParent);
				this.setCurrentNodeId(nodeId);
				this.addToHistory(nodeId);
			}
		}		
	};

	this.addToHistory = function(nodeId) {
		this.history.push(nodeId);
		this.addToHistoryExt();
	};

	this.addToHistoryExt = function(nodeId) {
		//
	}


	this.setNodeCurrent = function(xmlNode, set) {
		var spanEl = this.getNodeSpan(xmlNode);

		if (spanEl)
		{
			if (set)
			{
				// set the class
				spanEl.className = this.getCurrentNodeClass();
			}
			else
			{
				// set the class
				spanEl.className = "treenode";
			}
		}
	};

	this.gotoNode = function(nodeId) {
		this.openTreeNode(this.getXmlElementById(nodeId));
		this.setCurrentNodeId(nodeId);
	};

	this.openTreeNode = function(xmlNode) {
		var nodeId = xmlNode.getAttribute(this.uniqueIdName);
		var htmlNode = this.getHtmlElementById(nodeId);
		var imgNodes = htmlNode.getElementsByTagName("img");
		var openNodeId;
		var openXmlNode;
		
		if (htmlNode.style.display == "none")
			this.expandTreeNode(xmlNode.parentNode);
		
		if (imgNodes.length > 1)
		{
			if (!this.isRootNode(nodeId))
				imgNodes[1].setAttribute("src", this.getExpandedFolderImage());
			this.setNodeCurrent(xmlNode, true);
		}
		var openNodeId = this.getOpenNodeId()
		if (openNodeId != null && nodeId != openNodeId)
		{
			htmlCurrentNode = this.getHtmlElementById(openNodeId);
			imgNodes = htmlCurrentNode.getElementsByTagName("img");
			if (imgNodes.length > 1)
			{
				if (!this.isRootNode(openNodeId))
					imgNodes[1].setAttribute("src", this.getCollapsedFolderImage());
				openXmlNode = this.getXmlElementById(openNodeId);
				this.setNodeCurrent(openXmlNode, false);
			}
		}
		this.setOpenNodeId(nodeId);
		//htmlNode.scrollIntoView(false);
		
		this.openTreeNodeExt(xmlNode);
	};

	this.getNodePath = function(xmlNode) {
		if (xmlNode != this.xmlDoc.documentElement)
			return this.getNodePath(xmlNode.parentNode) + "/" + xmlNode.getAttribute("name");
		else
			return "//" + xmlNode.getAttribute("name");
	};

	this.openTreeNodeExt = function(nodeId) {
		// for extending
	};

	this.nodeCanBeExpanded = function(nodeId) {

	};

	this.nodeIsExpanded = function(nodeId) {

	};

	this.getImmediateSubdirectories = function(xmlNode) {
		var nodeId = xmlNode.getAttribute(this.uniqueIdName);
		var children;
		var directories = new Array();
		
		children = xmlNode.childNodes;
		for (var i = 0; i < children.length; i++)
		{
			if (children[i].nodeName == this.DIRECTORY)
				directories.push(children[i]);
		} 
		
		return directories;
	};

	this.expandTreeNode = function(xmlNode) {
		var nodeId = xmlNode.getAttribute(this.uniqueIdName);
		var htmlNode = this.getHtmlElementById(nodeId);
		var currentXmlNode = xmlNode;
		
		if (htmlNode.style.display == "none")
			this.expandTreeNode(xmlNode.parentNode);
		
		if (this.nodeHasSubdirectories(xmlNode))
		{
			//var subNodes = currentXmlNode.getElementsByTagName("directory");
			var subNodes = this.getImmediateSubdirectories(xmlNode);
			if (subNodes.length > 0)
			{
				var htmlSubNode = this.getHtmlElementById(subNodes[0].getAttribute(this.uniqueIdName));
				if (!htmlSubNode)
				{
					this.buildTreeLevel(htmlNode, currentXmlNode);
				}
				else
				{
					this.hideChildNodes(nodeId, false);
				}
			}
		}
		var imgNodes = htmlNode.getElementsByTagName("img");
		if (imgNodes.length > 0)
		{
			if (!this.isRootNode(nodeId))
				imgNodes[0].setAttribute("src", this.getExpandedImage());
		}
	};

	this.hideChildNodes = function(nodeId, hide) {
		var htmlNode = this.getHtmlElementById(nodeId);
		var children = htmlNode.childNodes;
		var display;
		
		if (hide)
			display = "none";
		else
			display = "block";
		
		for (var i = 0; i < children.length; i++)
		{	
			if (children[i].nodeName.toLowerCase() == "div")
			{
				children[i].style.display = display;
			}
		}	

	};

	this.nodeIsSubNode = function(childNodeId, parentNodeId) {
		var nodes = this.xmlDoc.selectNodes("//*[@id = '" + parentNodeId + "']//*[@id = '" + childNodeId + "']");
		if (nodes.length > 0)
			return true;
		else
			return false;
	};

	this.collapseTreeNode = function(xmlNode) {
		var nodeId = xmlNode.getAttribute(this.uniqueIdName);
		htmlNode = this.getHtmlElementById(nodeId);
		var openNewNode = false;
		this.hideChildNodes(nodeId, true);
		var imgNodes = htmlNode.getElementsByTagName("img");
		if (imgNodes.length > 0)
		{
			imgNodes[0].setAttribute("src", this.getCollapsedImage());
		}
		var openNodeId = this.getOpenNodeId();
		if (this.nodeIsSubNode(openNodeId,nodeId))
		{
			this.openTreeNode(xmlNode);
			openNewNode = true;
		}
		return openNewNode;
	};

	this.treeNodeIsHidden = function(nodeId) {
		htmlNode = this.getHtmlElementById(nodeId);
		display = htmlNode.style.display;
		if ((!display) || display == '' || display == "block")
		{
			return false;
		}
		else
		{
			return true;
		}
	};

	this.getNodeValueHtml = function(xmlNode) {
		var nodeId = xmlNode.getAttribute(this.uniqueIdName);
		return xmlNode.getAttribute("name");
	};

	this.getImageStateFile = function(nodeId, isRoot) {
		var rootNode = (!isRoot ? false : isRoot);
		if (this.nodeHasSubdirectories(nodeId) && !(rootNode && !this.rootNodeIsRegularNode))
			return this.getCollapsedImage();
		else
			return this.getBlankImage();
	};

	this.getImageIconFile = function(nodeId, isRoot) {
		var rootNode = (!isRoot ? false : isRoot);
		if (rootNode && !this.rootNodeIsRegularNode)
			return this.getExpandedFolderImage();
		else
			return this.getCollapsedFolderImage();
	};

	this.createTreeNode = function(xmlNode, isRoot) {
		/*
		REWRITE THIS DAMN THING INTO FUNCTIONS PLEASE.
		*/
		
		var nodeId = xmlNode.getAttribute(this.uniqueIdName);
		var currrentXmlElement = xmlNode;
		var rootNode = (!isRoot ? false : isRoot);
		var clickedType;
		var divEl = document.createElement("div");
		divEl.setAttribute("id", this.convertIdToTreeViewId(nodeId));
		if (!(rootNode && !this.rootNodeIsRegularNode))
			divEl.className = "treenode";
		else
			divEl.className = "roottreenode";
		
		var stopPropFx = clickedStopPropogation;
		var addClickedFxBody;
		var addClickedFx;
		
		var noBREl = document.createElement("nobr");
		
		var imgStateEl = document.createElement("img");
		var imgStateFile = this.getImageStateFile(xmlNode, rootNode);
		imgStateEl.className = "treenodestate";
		imgStateEl.setAttribute("src", imgStateFile);
		//if (!(rootNode && !this.rootNodeIsRegularNode))
		if (!(rootNode))
		{
			//clickedType = "treestate";
			normAddEvent(imgStateEl, "click", stopPropFx);
			normAddEvent(imgStateEl, "click", function () {
				_self.treeNodeClicked(nodeId, "treestate");
			});
		}

		var imgIconEl = document.createElement("img");
		var imgIconFile = this.getImageIconFile(xmlNode, rootNode);
		imgIconEl.className = "treenodeicon";
		imgIconEl.setAttribute("src", imgIconFile);
		//clickedType = "treenodeicon";
		normAddEvent(imgIconEl, "click", stopPropFx);
		normAddEvent(imgIconEl, "click", function () {
			_self.treeNodeClicked(nodeId, "treenodeicon");
		});
		
		var spanEl = document.createElement("span");
		spanEl.className = "treenode";
		var innerHtmlValue = this.getNodeValueHtml(xmlNode);
		spanEl.innerHTML = innerHtmlValue;
		clickedType = "treenodespan";
		normAddEvent(spanEl, "click", stopPropFx);
		normAddEvent(spanEl, "click", function () {
			_self.treeNodeClicked(nodeId, "treenodespan");
		});

		noBREl.appendChild(imgStateEl);
		noBREl.appendChild(imgIconEl);
		noBREl.appendChild(spanEl);
		divEl.appendChild(noBREl);
		
		return divEl;
		
	};

	this.createTreeDiv = function() {

	};

	this.createTreeImgState = function() {

	};

	this.createTreeImgIcon = function() {

	};

	this.createTreeSpan = function() {

	};

	this.appendNode = function(parenthtmlElement, currentXmlElement, isRoot) {	
		var rootNode = (!isRoot ? false : isRoot);
		var nodeId = currentXmlElement.getAttribute(this.uniqueIdName);
		treeNodeEl = this.createTreeNode(currentXmlElement, rootNode);
		treeNodeEl.style.display = "block";
		parenthtmlElement.appendChild(treeNodeEl);
		return treeNodeEl;
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

	this.isRootNode = function(nodeId) {
		if (nodeId == this.rootNodeId) 
			return true;
		else
			return false;
	};

}

	

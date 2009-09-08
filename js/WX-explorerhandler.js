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

function WXExplorerHandler() {

	this.explorerControls = new Array();

	this.treeNodeClicked = function (nodeId, treeViewId, clickedType) {
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			if (this.explorerControls[i].getTreeViewId() == treeViewId)
			{
				this.explorerControls[i].treeNodeClicked(nodeId, clickedType);
				return;
			}
		}
	};
	this.listNodeDoubleClicked = function (nodeId, listViewId, clickedType) {
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			if (this.explorerControls[i].getListViewId() == listViewId)
			{
				this.explorerControls[i].listNodeDoubleClicked(nodeId, clickedType);
				return;
			}
		}
	};
	
	this.showToolTip = function (e) {
		var evt = normGetEvent(e);
		var targetElement = normGetTargetElement(e);
		var nodeId = targetElement.getAttribute("id");
		var componentId = nodeId.substr(0, nodeId.indexOf("_"));
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			if (this.explorerControls[i].getComponentId() == componentId)
			{
				this.explorerControls[i].showToolTip(e);
				return;
			}
		}
	};
	
	this.hideToolTip = function (e) {
		var evt = normGetEvent(e);
		var targetElement = normGetTargetElement(e);
		var nodeId = targetElement.getAttribute("id");
		var componentId = nodeId.substr(0, nodeId.indexOf("_"));
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			if (this.explorerControls[i].getComponentId() == componentId)
			{
				this.explorerControls[i].hideToolTip();
				return;
			}
		}
	};
	
	this.setToolTipInfo = function (nodeId, componentId, componentName) {
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			if (this.explorerControls[i].getListViewId() == componentId)
			{
				this.explorerControls[i].setToolTipInfo(nodeId, componentId, componentName);
				return;
			}
		}
	};
	
	this.containerResize = function (e) {
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			this.explorerControls[i].containerResize(e);
		}
	};
	
	this.executeSearch = function (e) {
		var evt = normGetEvent(e);
		var targetElement = normGetTargetElement(e);
		var parentElement = targetElement.parentNode;
		var componentId = parentElement.firstChild.value;
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			if (this.explorerControls[i].getComponentId() == componentId)
			{
				this.explorerControls[i].executeSearch();
				return;
			}
		}
	};
	
	this.moveUpOneNode = function (e) {
		var evt = normGetEvent(e);
		var targetElement = normGetTargetElement(e);
		var parentElement = targetElement.parentNode;
		var componentId = parentElement.firstChild.value;
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			if (this.explorerControls[i].getComponentId() == componentId)
			{
				this.explorerControls[i].moveUpOneNode();
				return;
			}
		}
	};
	
	this.addressBackClicked = function (e) {
		var evt = normGetEvent(e);
		var targetElement = normGetTargetElement(e);
		var parentElement = targetElement.parentNode;
		var componentId = parentElement.firstChild.value;
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			if (this.explorerControls[i].getComponentId() == componentId)
			{
				this.explorerControls[i].addressBackClicked();
				return;
			}
		}
	};
	
	this.addressForwardClicked = function (e) {
		var evt = normGetEvent(e);
		var targetElement = normGetTargetElement(e);
		var parentElement = targetElement.parentNode;
		var componentId = parentElement.firstChild.value;
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			if (this.explorerControls[i].getComponentId() == componentId)
			{
				this.explorerControls[i].addressForwardClicked();
				return;
			}
		}
	};
	
	this.mouseDown = function (e) {
		var evt = normGetEvent(e);
		var targetElement = normGetTargetElement(e);
		var nodeId = targetElement.getAttribute("id");
		if (nodeId) {
			var componentId = nodeId.substr(0, nodeId.indexOf("_"));
			for (var i = 0; i < this.explorerControls.length; i++)
			{
				if (this.explorerControls[i].getComponentId() == componentId)
				{
				
	this.explorerControls[i].mouseDown(targetElement.getAttribute("id"));
					return;
				}
			}
		}
	};
	
	this.mouseUp = function (e) {
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			this.explorerControls[i].mouseUp();
		}
	};
	
	this.mouseMove = function (e) {
		var evt = normGetEvent(e);
		for (var i = 0; i < this.explorerControls.length; i++)
		{
			this.explorerControls[i].mouseMove(evt);
		}
	};

}


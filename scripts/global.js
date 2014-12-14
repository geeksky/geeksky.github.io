// Global

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
}

function startMove(obj, attr, iTarget, fnEnd) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function ()
	{
		doMove(obj, attr, iTarget, fnEnd);
	}, 30)	
}

function doMove(obj, attr, iTarget, fnEnd) {
	var iCur = parseFloat(getStyle(obj, attr));
	if (attr == "opacity")
	{
		iCur = parseInt(iCur * 100)
	}
	var iSpeed = (iTarget - iCur) / 10;
	iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	
	if (iTarget == iCur)
	{
		clearInterval(obj.timer);
		fnEnd && fnEnd();	
	}
	else
	{
		if (attr == "opacity")
		{
			obj.style.filter = "alpha(opacity = " + (iCur + iSpeed) + ")";
			obj.style.opacity = (iCur + iSpeed)	/ 100;
		}
		else
		{
			obj.style[attr] = iCur + iSpeed + "px";	
		}
	}
}

// Navigation
function navSlide(){
	var oNav = document.getElementById('nav');
	var oBtn = oNav.getElementsByTagName('a');
	var oList = document.getElementById('sectionList');
	var sections = oList.getElementsByTagName('section');
	var oSpan = document.getElementById("home").getElementsByTagName("span")[0];
	var spanLinks = oSpan.getElementsByTagName("a");

	var bOrder = true;
	var index  = 0;
	var timer = playTimer = null;
	var i=0;

	for(i=0; i<oBtn.length;i++) {
		oBtn[i].index = i;
		oBtn[i].onclick = function () {
			index = this.index;
			startMove(oList, "top", -(index * sections[0].offsetHeight)+79);
			return false;
		}
	}

	spanLinks[0].onclick = function () {
			index = 1;
			startMove(oList, "top", -(index * sections[0].offsetHeight)+79);
			return false;
		}

	spanLinks[1].onclick = function () {
			index = 6;
			startMove(oList, "top", -(index * sections[0].offsetHeight)+79);
			return false;
		}
}

// Home Page
function homeSlide() {
	var aImg = document.getElementById("home").getElementsByTagName("img");
	var play = null;
	var i=index = 0;

	play = setInterval(function () {
		index++;
		if(index >= aImg.length) {index=0;}
		show(index);
	  }, 3000);

	function show(item) {
		index = item;

		for(i=0;i<aImg.length;i++) {
			startMove(aImg[i],"opacity", 0);
		}

		startMove(aImg[index], "opacity", 100);
	}
}

// Who Page 
function imgHover() {
	var items = document.getElementById("people").getElementsByTagName("li");
	var i=0;

	for(i=0;i<items.length;i++) {
		items[i].index = i;
		items[i].onmouseover = function() {
			var aImg = items[this.index].getElementsByTagName("img");
			startMove(aImg[0], "opacity", 0);
			startMove(aImg[1], "opacity", 100);	
		}

		items[i].onmouseout = function() {
			var aImg = items[this.index].getElementsByTagName("img");
			startMove(aImg[1], "opacity", 0);
			startMove(aImg[0], "opacity", 100);	
		}
	}

	var oBtn = document.getElementById("stuffList").getElementsByTagName("a");
	var j=0;
	for(j=0; j<oBtn.length; j++) {
		oBtn[j].onmouseover = function() {
			var oImg = this.getElementsByTagName("img");
			startMove(oImg[1], "opacity", 100);
			startMove(oImg[0], "opacity", 0);
			this.onmouseout = function() {
				startMove(oImg[1], "opacity", 0);
				startMove(oImg[0],"opacity", 100);
			}
		}
	}
	
}

function iconSlide() {
	var icons = document.getElementById("static").getElementsByTagName("li");
	var i = 0;

	for(i=0; i<icons.length; i++) {
		icons.index = i;
		icons[i].onmouseover = function() {
			var aImg = this.getElementsByTagName("img");
			startMove(aImg[1], "top", 0);

			this.onmouseout = function() {
				startMove(aImg[1], "top", aImg[1].offsetHeight);
			 }
		}		
	}
}

function workflowSlide() {
	var oList1 = document.getElementById("stepList1");
	var oList2 = document.getElementById("stepList2");
	var itemsM = oList1.getElementsByTagName("li");
	var itemsR = oList2.getElementsByTagName("li");
	var oController = document.getElementById("icon-index").getElementsByTagName("span");
	var i = 0;
	var index = 0;
	var target = oList1.offsetWidth;
	var lBtn= document.getElementById("left-btn");
	var rBtn = document.getElementById("right-btn");

	for(i=0; i<oController.length; i++) {
		itemsM[i].index = itemsR[i].index = oController[i].index = i;
		oController[i].onclick = function() {
			alert(index + "," + this.index);
			resetList(index, this.index);
			slide(index, this.index);
			index = this.index;			
		} 
	}

	lBtn.onclick = function() {
		if(index == 0) {
			resetList(index, oController.length-1);
			slide(index, oController.length-1);
			index = oController.length-1;
		}
		else {
			resetList(index, index-1);
			slide(index, index-1);
			index--;
		}	
	}

	rBtn.onclick = function() {
		if(index == oController.length-1) {
			resetList(index, 0);
			slide(index, 0);
			index = 0;
		}
		else {
			resetList(index, index+1);
			slide(index, index+1);
			index++;
		}	
	}

	function slide(current, next) {
		startMove(oController[current], "opacity", 30);
		startMove(oController[next], "opacity", 100);

		if(next > current) {
				startMove(oList1, "left", -target);
				startMove(oList2, "left", 0);
			}
			else if(next < current) {
				startMove(oList1, "left", target);
				startMove(oList2, "left", 0);
			}	
	}
	function resetList(current, next) {
		var j = 0;
		for(j=0; j<itemsM.length;j++) {
			itemsM[j].className = "";
		}

		itemsM[current].className = "active";
		oList1.style.left = "0";
		if(next > current) {			
			oList2.style.left = "100%";
		}
		else if(next < current){
			oList2.style.left = "-100%";
		}
		itemsR[current].className = "";
		itemsR[next].className = "active";
	}

}

// Stuff Page
function stuffSlide() {
	var lArrow = document.getElementById("left-Arrow");
	var rArrow = document.getElementById("right-Arrow");
	var oList = document.getElementById("stuffList");
	var len = oList.getElementsByTagName("li").length;
	var index = 0;
	var dis = oList.getElementsByTagName("li")[0].offsetWidth;

	lArrow.onclick = function(){
	  if(index>=len/2){
	  	index = 0;
	  	oList.style.left = -dis*index + "px";
	  }	  
	  	index++;
	  	startMove(oList, "left", -dis*index);  	
	}

	rArrow.onclick = function(){
	  if(index<=0) {
	  	index=len/2;
	  	oList.style.left = -dis*index + "px";
	  }	  
	  	index--;
	  	startMove(oList, "left", -dis*index);	  
	}
}

//Load events 
addLoadEvent(navSlide);
addLoadEvent(homeSlide);
addLoadEvent(imgHover);
//addLoadEvent(iconSlide);
addLoadEvent(workflowSlide);
addLoadEvent(stuffSlide);
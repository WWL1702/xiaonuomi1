"use strict";

function Mirror(obj){
	this.smallBoxId=obj.smallBoxId;//要放大的容器id
	this.smallImgId=obj.smallImgId;//要放大的图片id
	this.imgPath = obj.imgPath;
	
	this.baseLeft=obj.baseLeft;//图片容器初始的left
	this.baseTop=obj.baseTop;//图片容器初始的top
	
	this.baseWidth=obj.baseWidth;//图片容器的width
	this.baseHeight=obj.baseHeight;//图片容器的height
	
	this.mirrorWidth=obj.mirrorWidth; //放大镜的width
	this.mirrorHeight=obj.mirrorHeight;//放大镜的height
	this.multiple=obj.multiple;//放大的倍数
	
	this.position = obj.position;//大图出现的位置（上，右，下，左）
	this.hasBig = false;
	this.mirrorDom = null;
	this.bigBoxDom = null;
	this.bigImgDom = null;
	
	this.initUI();
}

Mirror.prototype={
	initUI:function(){	
		var t = this;//this是放大镜对象；
		
		$(this.smallBoxId).onmouseover = function(event){//????
			var e = event || window.event;
			console.log("over");
			if(!t.hasBig){
				t.createBig(e);
				t.hasBig = true;
			}
		}
		
		$(this.smallBoxId).onmousemove = function(event){
			var e = event || window.event;
			var left1;
			var top1; 
			if(e.target!=$(t.smallBoxId)){
				left1 = parseFloat(e.target.style.left)+e.offsetX-t.baseLeft-t.mirrorWidth/2;//放大镜的left
				top1 = parseFloat(e.target.style.top)+e.offsetY-t.baseTop-t.mirrorHeight/2;//放大镜的top
			}else{
				left1 = e.offsetX-t.baseLeft-t.mirrorWidth/2;//放大镜的left
				top1 = e.offsetY-t.baseTop-t.mirrorHeight/2;//放大镜的top
			}
			t.overSize(left1,top1);//根据放大镜的位置，调整大图的位置；
		}
		
		$(this.smallBoxId).onmouseout = function(){
			/*
			if(t.hasBig){
				t.removeBig();
			}*/
		}
	},
	
	removeBig:function(){
		//删除放大镜子和大图
		$(this.smallBoxId).removeChild(this.mirrorDom);//删除镜子
		this.bigBoxDom.removeChild(this.bigImgDom);//删除大容器里的图片
		$(this.smallBoxId).removeChild(this.bigBoxDom);//删除大容器
		this.hasBig = false;//没有放大镜了
		
	},
	
	createBig:function(e){
		console.log("createBig");
		//放大镜需要动态创建
		this.mirrorDom = document.createElement("div");		
		//根据鼠标的位置计算放大镜的位置（鼠标的坐标减去放大镜的宽高的一半）；
		var mirrorLeft = e.offsetX-this.baseLeft-this.mirrorWidth/2;
		var mirrorTop = e.offsetY-this.baseTop-this.mirrorHeight/2;
	//	this.mirrorDom.style.cssText = "position:absolute;left:"+mirrorLeft+"px;top:"+mirrorTop+"px;width:"+this.mirrorWidth+"px;height:"+this.mirrorHeight+"px;border:1px solid black;";
		this.mirrorDom.style.cssText = "position:absolute;left:"+mirrorLeft+"px;top:"+mirrorTop+"px;width:"+this.mirrorWidth+"px;height:"+this.mirrorHeight+"px";		
		var t = this;
		this.mirrorDom.onmouseout = function(event){
			var e = event||window.event;
			console.log("out");
			if(t.hasBig){
				console.log("remove");
				t.removeBig();				
			}
			e.stopPropagation();
		}
		
		$(this.smallBoxId).appendChild(this.mirrorDom);
		
		//大图的容器也需要动态创建
		this.bigBoxDom = document.createElement("div");
		var boxBigWidth = this.mirrorWidth*this.multiple;
		var boxBigHeight = this.mirrorHeight*this.multiple
		//要根据大图的位置（上,右，下，左）来计算left和top
		var left1,top1;
		switch(this.position){
			case "上":left1=0;top1=-1*boxBigHeight;break;
			case "右":left1=this.baseWidth;top1=0;break;
			case "下":left1=0;top1=this.baseHeight;break;
			case "左":left1=-1*boxBigWidth;top1=0;break;
			default:;
		}
//		this.bigBoxDom.style.cssText = "position:absolute;left:"+left1+"px;top:"+top1+"px;width:"+boxBigWidth+"px;height:"+boxBigHeight+"px;overflow:hidden;border:1px solid black;";
			this.bigBoxDom.style.cssText = "position:absolute;left:"+left1+"px;top:"+top1+"px;width:"+boxBigWidth+"px;height:"+boxBigHeight+"px;overflow:hidden;";
		$(this.smallBoxId).appendChild(this.bigBoxDom);
		
		//大图也需要动态创建	
		this.bigImgDom = document.createElement("img");
		this.bigImgDom.src=this.imgPath;
		
		var bigImgWidth = this.baseWidth*this.multiple;
		var bigImgHeight = this.baseHeight*this.multiple;
		this.bigImgDom.style.cssText ="position:absolute;width:"+bigImgWidth+"px;height:"+bigImgHeight+"px;";
		this.bigBoxDom.appendChild(this.bigImgDom);
		
		////根据放大镜的位置，调整大图的位置；
		this.overSize(mirrorLeft,mirrorTop);
		
	},
	
	//根据，做什么
	overSize:function(left1,top1){		
		if(left1<=0){
			left1=0;
		}else if(left1>=this.baseWidth-this.mirrorWidth-2){
			left1 = this.baseWidth-this.mirrorWidth-2;
		}
		
		if(top1<=0){
			top1 = 0;
		}else if(top1>=this.baseHeight-this.mirrorHeight-2){
			top1 =this.baseHeight-this.mirrorHeight-2;
		}
		
		//放大镜是倒数第二个孩子
		//var mirrorObj = $(this.smallBoxId).lastElementChild.previousElementSibling;
		this.mirrorDom.style.left = left1+"px";
		this.mirrorDom.style.top = top1+"px";	
		//大图是倒数第一个孩子的孩子
	//	var bigImg = $(this.smallBoxId).lastElementChild.firstElementChild;
		this.bigImgDom.style.left = -1*this.multiple*left1+"px";
		this.bigImgDom.style.top = -1*this.multiple*top1+"px";
	}
}





jQuery.fn.extend({//jQuery的壳子	
	mirror:function(obj){		
		function Mirror(obj){
			for(var key in obj){
				this[key] = obj[key];				
			}			
			this.hasBig = false;
			this.mirrorDom = null;
			this.bigBoxDom = null;
			this.bigImgDom = null;			
			this.initUI();
		}
		
		Mirror.prototype={ //赋值语句
			initUI:function(){	
				var t = this;//this是放大镜对象；				
				$(this.smallBoxId).mouseover(function(event){
					var e = event || window.event;
					if(!t.hasBig){
						console.log("createBig()");
						t.createBig(e);
						t.hasBig = true;
					}
				})
				
				$(this.smallBoxId).mousemove(function(event){
					var e = event || window.event;
					var left1;
					var top1; 
					if(e.target!=$(t.smallBoxId)){//????
						left1 = parseFloat(e.target.style.left)+e.offsetX-t.baseLeft-t.mirrorWidth/2;//放大镜的left
						top1 = parseFloat(e.target.style.top)+e.offsetY-t.baseTop-t.mirrorHeight/2;//放大镜的top
					}else{
						left1 = e.offsetX-t.baseLeft-t.mirrorWidth/2;//放大镜的left
						top1 = e.offsetY-t.baseTop-t.mirrorHeight/2;//放大镜的top
					}
					t.overSize(left1,top1);//根据放大镜的位置，调整大图的位置；
				});
				
				$(this.smallBoxId).mouseout(function(){
					/*
					if(t.hasBig){
						t.removeBig();
					}*/
				});
			},
			
			removeBig:function(){
				//删除放大镜子和大图
				$(this.smallBoxId).remove(this.mirrorDom);//删除镜子
				this.bigBoxDom.removeChild(this.bigImgDom);//删除大容器里的图片
				$(this.smallBoxId).remove(this.bigBoxDom);//删除大容器
				this.hasBig = false;//没有放大镜了
				
			},
			
			createBig:function(e){
				//放大镜需要动态创建
				//根据鼠标的位置计算放大镜的位置（鼠标的坐标减去放大镜的宽高的一半）；
				
				var mirrorLeft = e.offsetX-this.baseLeft-this.mirrorWidth/2;
				var mirrorTop = e.offsetY-this.baseTop-this.mirrorHeight/2;
			
				var mirrorDiv = "<div style='position:absolute;left:"+mirrorLeft+"px;top:"+mirrorTop+"px;width:"+this.mirrorWidth+"px;height:"+this.mirrorHeight+"px;border:1px solid black;' ></div>";
				var t = this;
				this.mirrorDom = $(mirrorDiv)[0];//根据字符串创建了DOM对象
				$(this.smallBoxId).append(this.mirrorDom);
				
				this.mirrorDom.onmouseout = function(event){
					var e = event||window.event;
					console.log("out");
					if(t.hasBig){
						console.log("remove");
						t.removeBig();				
					}
					e.stopPropagation();
				}
			
				//大图的容器也需要动态创建
				this.bigBoxDom = document.createElement("div");
				var boxBigWidth = this.mirrorWidth*this.multiple;
				var boxBigHeight = this.mirrorHeight*this.multiple;
				//要根据大图的位置（上,右，下，左）来计算left和top
				var left1,top1;
				switch(this.position){
					case "上":left1=0;top1=-1*boxBigHeight;break;
					case "右":left1=this.baseWidth;top1=0;break;
					case "下":left1=0;top1=this.baseHeight;break;
					case "左":left1=-1*boxBigWidth;top1=0;break;
					default:;
				}
				this.bigBoxDom.style.cssText = "position:absolute;left:"+left1+"px;top:"+top1+"px;width:"+boxBigWidth+"px;height:"+boxBigHeight+"px;overflow:hidden;";
				
				$(this.smallBoxId).append(this.bigBoxDom);
				
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
				if(left1<=-1){
					left1=-1;
				}else if(left1>=this.baseWidth-this.mirrorWidth-1){
					left1 = this.baseWidth-this.mirrorWidth-1;
				}
				
				if(top1<=-1){
					top1 = -1;
				}else if(top1>=this.baseHeight-this.mirrorHeight-1){
					top1 =this.baseHeight-this.mirrorHeight-1;
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
		var m = new Mirror(obj);	
	}//mirror函数；
});


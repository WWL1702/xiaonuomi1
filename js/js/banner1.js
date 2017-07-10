"use strict";
//JQuery 中fadeIn和fadeOut是针对display：none或者block
function Banner(json){
	this.boxId='#'+json.boxId;
	this.aArr=json.aArr;
	this.imgArr=json.imgArr;
	this.width=json.width;
	this.height=json.height;
	this.fadeInOutTime=json.fadeInOutTime;
	this.pauseTime=json.pauseTime;
	this.btnWidth=json.btnWidth;
	this.btnHeight=json.btnHeight;
	this.btnSpace=json.btnSpace;
	this.btnColor=json.btnColor;
	this.btnHighColor=json.btnHighColor;
	this.bigBtnWidth=json.bigBtnWidth;
	this.bigBtnHeight=json.bigBtnHeight;
	this.bigBtnColor=json.bigBtnColor;
	this.bigBtnFontColor=json.bigBtnFontColor;
	this.btnHasOrd = json.btnHasOrd;
	this.btnTop=this.height-this.btnHeight-2*this.btnSpace;
	this.btnLeft=(this.width-(this.btnWidth+this.btnSpace)*this.imgArr.length)/2;
	this.bigBtnTop=(this.height-this.bigBtnHeight)/2;
	this.bigBtnLeft=2*this.btnSpace;
	this.bigBtnRight=this.width-2*this.btnSpace-this.bigBtnWidth;
	this.bigBtnFontSize=this.bigBtnHeight-this.btnSpace;
	this.inOrd=1;
	this.outOrd=1;
	this.bannerTime=null;
	if(typeof this.initUI!="function"){
		Banner.prototype.initUI=function(){
			$(this.boxId).css({position:'relative',height:this.height+'px',width:this.width+'px',overflow:'hidden'});
			var imgStr='';
			for(var i=0;i<this.imgArr.length;++i){
				imgStr +="<a href="+this.aArr[i]+" style='display:none;height:"+this.height+"px;width:"+this.width+"px;position:absolute;left:-100%;'><img src="+this.imgArr[i]+" style='width:"+this.width+"px;height:"+this.height+"px;display:block;'/></a>";
			}
			$(this.boxId).append(imgStr);
			$(this.boxId+">a:first").css('display','block');
			$(this.boxId+">a:lt(2)").css("left","0px");
			var btnStr="<ul style='position:absolute;top:"+this.btnTop+"px;left:"+this.btnLeft+"px;z-index:10;padding:0'>";
			for(var i=0;i<this.imgArr.length;++i){
				btnStr+="<li style='list-style:none;float:left;height:"+this.btnHeight+"px;width:"+this.btnWidth+"px;background:"+this.btnColor+";margin-left:"+this.btnSpace+"px;border-radius:50%;cursor:pointer'>";
				if(this.btnHasOrd){
					btnStr += i+1;
				}
				btnStr+="</li>";
			}
			btnStr +="</ul>";
			$(this.boxId).append(btnStr);
			$(this.boxId+">ul>li:first").css("backgroundColor",this.btnHighColor);
			var leftBigBtnStr="<input type='button' style='display:none;position:absolute;height:"+this.bigBtnHeight+"px;width:"+this.bigBtnWidth+"px;background:"+this.bigBtnColor+";left:"+this.bigBtnLeft+"px;top:"+this.bigBtnTop+"px;color:"+this.bigBtnFontColor+";line-height:"+this.bigBtnHeight+"px;font-size:"+this.bigBtnFontSize+"px;border-radius:5%;z-index:10;opacity:.8;outline:none;text-aglin:center;border:none;cursor:pointer' value='\<'/>"
			var rightBigBtnStr="<input type='button' style='display:none;position:absolute;height:"+this.bigBtnHeight+"px;width:"+this.bigBtnWidth+"px;background:"+this.bigBtnColor+";left:"+this.bigBtnRight+"px;top:"+this.bigBtnTop+"px;color:"+this.bigBtnFontColor+";line-height:"+this.bigBtnHeight+"px;font-size:"+this.bigBtnFontSize+"px;border-radius:5%;z-index:10;opacity:.8;outline:none;text-aglin:center;border:none;cursor:pointer' value='\>'/>"
			$(this.boxId).append(leftBigBtnStr);
			$(this.boxId).append(rightBigBtnStr);
		}
		
		
		Banner.prototype.goStep=function(){
			this.outOrd=this.inOrd;
			this.inOrd++;
			this.check();
			this.fadeInOutInit();
			this.fadeInOut();
		}
		Banner.prototype.check=function(){
			if(this.inOrd>this.imgArr.length){
				this.inOrd=1
			}
			if(this.inOrd<1){
				this.inOrd=this.imgArr.length
			}
			if(this.outOrd>this.imgArr.length){
				this.outOrd=1
			}
			if(this.outOrd<1){
				this.outOrd=this.imgArr.length
			}
		}
		Banner.prototype.fadeInOutInit=function(){
			$(this.boxId+">ul>li").css('background',this.btnColor);
			$(this.boxId+">ul>li:eq("+(this.inOrd-1)+")").css('background',this.btnHighColor);
			$(this.boxId+">a").css('left',"-100%");
			$(this.boxId+">a:eq("+(this.inOrd-1)+")").css('left',"0px");
			$(this.boxId+">a:eq("+(this.outOrd-1)+")").css('left',"0px");
		}
		Banner.prototype.fadeInOut=function(){
			this.fadeInOutInit();
			$(this.boxId+">a:eq("+(this.inOrd-1)+")").fadeIn(this.fadeInOutTime);
			$(this.boxId+">a:eq("+(this.outOrd-1)+")").fadeOut(this.fadeInOutTime);
		}
		Banner.prototype.goImg=function(ord){
			this.outOrd=this.inOrd;
			this.inOrd=ord;
			this.check();
			this.fadeInOutInit();
			this.fadeInOut();
		}
		Banner.prototype.nextImg=function(){
			this.outOrd=this.inOrd;
			this.inOrd++;
			this.check();
			this.fadeInOutInit();
			this.fadeInOut();
		}
		Banner.prototype.previousImg=function(){
			this.outOrd=this.inOrd;
			this.inOrd--;
			this.check();
			this.fadeInOutInit();
			this.fadeInOut();
		}
		Banner.prototype.bannerAddEvent=function(){
			var that=this;
			$(this.boxId+">ul").on('mousedown','li',function(){
				var index = $(that.boxId+">ul>li").index(this);
				that.goImg(index+1);
			});
			$(that.boxId+">input:first").on('click',function(){
				that.previousImg();
			});
			$(that.boxId+">input:last").on('click',function(){
				that.nextImg();
			});
		     $(this.boxId).on({
				 mouseover:function(){
					clearInterval(that.bannerTime);
					$(that.boxId+">input").css('display','block')
				},
				mouseout:function(){
					that.bannerTime=setInterval(that.goStep.bind(that),that.fadeInOutTime+that.pauseTime);
					$(that.boxId+">input").css('display','none')
				}
			 });		
		}
		Banner.prototype.autoPlay=function(){
			this.bannerTime=setInterval(this.goStep.bind(this),this.fadeInOutTime+this.pauseTime);
		}
		
	}
	
	this.initUI();
	this.bannerAddEvent();
	this.autoPlay();
}

$(function(){
	new Banner({
		boxId:"banner1",
		aArr:["#","#","#","#","#"],
		imgArr:["img/b8014a90f603738de815826cb91bb051f819ec25.jpg","img/b812c8fcc3cec3fd36136ed8d388d43f8794276a.jpg"],
		width:251,
		height:259,
	    fadeInOutTime:800,
	    pauseTime:2000,
		btnWidth:8,
		btnHeight:8,
		btnSpace:8,
		btnColor:"blue",
		btnHighColor:"yellow",
		bigBtnWidth:20,
		bigBtnHeight:20,
		bigBtnColor:"#666",
		bigBtnFontColor:"white",
		btnHasOrd:false
	})
})
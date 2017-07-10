//定义放大镜模块
define(['jquery-1.8.3.min'],function(){
	//放大镜
	function BigMirrors(obj){
		//所在容器
		this.boxId = obj.boxId;
		this.boxWidth = $(this.boxId).width();
		this.boxHeight = $(this.boxId).height();
	//放大镜的位置：
		this.left = "0px";
		this.top = "0px";
	//放大镜的尺寸
		this.mirrorWidth = obj.mirrorWidth;
		this.mirrorHeight = obj.mirrorHeight;
	//放大的倍数
		this.multiple = obj.multiple;
	//放大图片所在位置（上，右，下，左）
		this.direction = obj.direction;
		//放大的图片路径
		this.bigImgPath = obj.bigImgPath;
		this.initUI();
	}
	
	BigMirrors.prototype.initUI = function(){
		let that = this;
		$(this.boxId).mouseenter(function(){
			let offset = $(that.boxId).offset();
			let scrollLeft =document.documentElement.scrollLeft || document.body.scrollLeft;
			let scrollTop =document.documentElement.scrollTop || document.body.scrollTop;
			let left = event.clientX-offset.left+scrollLeft;
			let top = event.clientY-offset.top+scrollTop;
			that.createBigMirrorsUI(left,top);
			that.createBigImg(-1*that.multiple*left,-1*that.multiple*top);
		});
		
		$(this.boxId).mouseleave(function(){
			$(that.boxId).html("");
		});
		
		$(this.boxId).mousemove(function(){
			let scrollLeft =document.documentElement.scrollLeft || document.body.scrollLeft;
			let scrollTop =document.documentElement.scrollTop || document.body.scrollTop;
		//1、让放大镜跟着鼠标走
			that.left = event.clientX-$(that.boxId).offset().left-that.mirrorWidth/2+scrollLeft;
			that.top= event.clientY-$(that.boxId).offset().top-that.mirrorHeight/2+scrollTop;
			
			if(that.left<0){
				that.left = 0;
			}else if(that.left+that.mirrorWidth>that.boxWidth){
				that.left =that.boxWidth-that.mirrorWidth;
			}
			if(that.top<0){
				that.top = 0;
			}else if(that.top+that.mirrorHeight>that.boxHeight){
				that.top =that.boxHeight-that.mirrorHeight;
			}
			
			let str = that.boxId+" div:first-child";
	//console.log($(str));
			$(str).css("left",that.left);
			$(str).css("top",that.top);
			
			//2、让放大的效果也动态变化
			let str1 = that.boxId+" div:last-child div";
			//console.log($(str1));
			$(str1).css("left",-1*that.left*that.multiple);
			$(str1).css("top",-1*that.top*that.multiple);	
		});
	}
	
	//创建放大镜
	BigMirrors.prototype.createBigMirrorsUI=function(left,top){
		this.left = left-this.mirrorWidth/2;
		this.top = top-this.mirrorHeight/2;
		if(this.left<0){
			this.left = 0;
		}else if(this.left+this.mirrorWidth>this.boxWidth){
			this.left =this.boxWidth-this.mirrorWidth;
		}
		if(this.top<0){
			this.top = 0;
		}else if(this.top+this.mirrorHeight>this.boxHeight){
			this.top =this.boxHeight-this.mirrorHeight;
		}
		
		let str = "<div style='position:absolute;left:"+this.left+"px;top:"+this.top+"px;width:"+this.mirrorWidth+"px;height:"+this.mirrorHeight+"px;background-color:rgba(0,0,255,0.3)'></div>";
		$(this.boxId).append(str);
	}
	
	//创建放大的图片
	BigMirrors.prototype.createBigImg = function(){
		//smallBox:放大图片的可视容器，
		//showDiv：放大的图片；
		let leftTopStr = "";
		switch(this.direction){
			case "左":leftTopStr="left:"+-1*$(this.boxId).width()+"px;top:0px;";break;
			case "上":leftTopStr="left:0px;top:"+(-1*$(this.boxId).height())+"px;";break;
			case "右":leftTopStr="left:"+$(this.boxId).width()+"px;top:0px;";break;
			case "下":leftTopStr="left:0px;top:"+$(this.boxId).height()+"px;";break;
		}
		//console.log("放大效果的定位："+leftTopStr);
		
		let str = "<div style='position:absolute;"+leftTopStr+"width:"+this.mirrorWidth*this.multiple+"px;height:"+this.mirrorHeight*this.multiple+"px;border:1px solid #000;overflow:hidden;'>";
		//计算宽度
		let width = ($(this.boxId).width()*this.multiple);
		let height = ($(this.boxId).height()*this.multiple);
		let left = -1*this.left*this.multiple;
		let top =  -1*this.top*this.multiple;
		str += "<div  style='position:absolute;left:"+left+"px;top:"+top+"px;width:"+width+"px;height:"+height+"px;background-image:url("+this.bigImgPath+");background-size:"+width+"px "+height+"px;'>";
		str +="</div>";
		str +="</div>";
	
		$(this.boxId).append(str);
	}

	return {
		BigMirrors:BigMirrors
	};
});

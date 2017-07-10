//定义模块
define(['tools'],function(tools){
	function SlideShow(obj){
		//属性（有什么）
		this.boxId = obj.boxId;//所在容器；
		this.width = obj.width;
		this.height = obj.height;
		this.imgs = obj.imgs;//轮播图播放的图片数组
		this.currOrd = obj.currOrd;//当前图片序号(进入的图片)；有效取值为1-4；
		
		this.timeSpace = obj.timeSpace;//两张图片之间的时间间隔。
		this.incLeft = obj.incLeft;
			
		this.outLeft = 0;//出去图片的left
		this.inLeft = this.width;//进来图片的left。
		this.fadeInOutTime=null;//切换效果所使用的定时器
		this.myTimer=null;//轮播图的定时器。
		
		this.direction = obj.direction;
		
		this.btnWidth = obj.btnWidth;
		this.btnHeight = obj.btnHeight ;
		this.btnColor = obj.btnColor;
		this.btnHighColor = obj.btnHighColor;
		
		this.initUI();
		this.startChange();
	}
	
	
		//方法（能干什么）	
		//
		SlideShow.prototype.initUI = function(){
			//1、动态创建所有的图片
			for(let i=0;i<this.imgs.length;i++){
				let imgDom = tools.$create("img");
				imgDom.src = this.imgs[i];
				imgDom.style.cssText = "position:absolute;left:-1000px;top:0px;width:"+this.width+"px;height:"+this.height+"px;";
				tools.$(this.boxId).appendChild(imgDom);
			}
			//把第一个imgDom的left设置为0；
			tools.$(this.boxId).children[0].style.left = "0px";
			
			//2、动态创建所有的li
			let ulDom = tools.$create("ul");
			ulDom.style.cssText = "position:absolute;list-style:none;bottom:20px;left:130px;";//??left需要计算；
			tools.$(this.boxId).appendChild(ulDom);
	
			for(let i=0;i<this.imgs.length;i++){
				let liDom = tools.$create("li");
				liDom.style.cssText = "float:left;margin-right:20px;width:"+this.btnWidth+"px;	height:"+this.btnHeight+"px;background-color:"+this.btnColor+";border-radius:50%;";
				ulDom.appendChild(liDom);
			}
			ulDom.children[this.currOrd-1].style.backgroundColor = this.btnHighColor;
			
			let that = this;//this是轮播图
			//给轮播图容器增加事件
			tools.$(this.boxId).onmouseover = function(){
				that.stopChange();
			}
			//给轮播图容器增加事件
			tools.$(this.boxId).onmouseout = function(){
				that.startChange();
			};
			
			let lis = ulDom.children;
			for(let i=0;i<lis.length;i++){
				lis[i].onclick = function(){
					that.goImg(i+1);
				}
			}
		}
		
		//1、自动变换
		//每个一秒钟换一张图片
		SlideShow.prototype.startChange=function(){
			let that = this;
			this.myTimer = setInterval(function(){
				that.goStep();
			},this.timeSpace);
		}
	
		//改变图片的地址
		SlideShow.prototype.goStep=function(){
			//1、对当前图片序号进行加加
			this.currOrd++;
			if(this.currOrd>this.imgs.length){
				this.currOrd=1;
			}
			let currOutOrd = this.currOrd-1;//currOutOrd:滑出的图片序号
			if(currOutOrd<1){
				currOutOrd = this.imgs.length;
			}
			console.log("自动播放：currOrd="+this.currOrd);
			
			//2、改变图片
			//tools.$("imgId").src="images/"+currOrd+".jpg";
			//两张图片的移动；
			this.moveImg(currOutOrd,this.currOrd);
			
			//3、改变按钮的背景颜色
			this.changeBtnColor(this.currOrd);		
		}
		
		//传入哪个序号，就把哪个序号对应的li的背景颜色变成高亮颜色
		SlideShow.prototype.changeBtnColor=function(ord){
			var lis = tools.$(this.boxId).lastElementChild.children;//得到所有的li
			for(let i=0;i<lis.length;i++){
				lis[i].style.backgroundColor = this.btnColor;
			}
			lis[ord-1].style.backgroundColor = this.btnHighColor;
		}
	
	
		//4、两张图片的切换（滑动）
		SlideShow.prototype.moveImg=function(outOrd,inOrd){ //假定outOrd = 1；inOrd = 2；
			this.outLeft = 0;//出去图片的left
			let directionH = this.direction =="左"?1:-1;	
			this.inLeft = directionH*this.width;//进来图片的left。		
			
			//1、把要进入的图片放在盒子的右边	
			tools.$(this.boxId).children[inOrd-1].style.left = this.inLeft+"px";
			
			console.log("outOrd="+outOrd);
			console.log("inOrd="+inOrd);
			
			//2、滑动（一共走400px，花2000毫秒走完）；
			let that = this;
			this.fadeInOutTime = setInterval(function(){
												that.outLeft=that.outLeft+(-1*directionH)*that.incLeft;
												that.inLeft=that.inLeft+(-1*directionH)*that.incLeft;											
															
												if(that.direction =="左"){
													if(that.inLeft<0){
														that.inLeft=0;			
														//清除定时器
														clearInterval(that.fadeInOutTime);			
													}
												}else if(that.direction =="右"){
													if(that.inLeft>0){
														that.inLeft=0;			
														//清除定时器
														clearInterval(that.fadeInOutTime);			
													}							
												}
													
												tools.$(that.boxId).children[outOrd-1].style.left = that.outLeft+"px";
												tools.$(that.boxId).children[inOrd-1].style.left = that.inLeft+"px";		
											},
											 10										
											);
		}
	
		//2、停止变换
		SlideShow.prototype.stopChange=function(){
			window.clearInterval(this.myTimer);
		}
	
		//3、跳转到指定图片
		SlideShow.prototype.goImg=function(ord){	
			let currOutOrd = this.currOrd;//当前显示的图片序号，就是要出去的图片序号；	
			this.currOrd = ord;//把要进入序号改成指定的序号；
			
			this.moveImg(currOutOrd,this.currOrd);
			
			this.changeBtnColor(ord);		
		}
	
	//当前模块对外开放的接口（属性和函数）
	return {
		SlideShow:SlideShow
		
	}
	
});

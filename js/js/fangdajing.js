function ShowGoods(json){
	this.boxId="#"+json.boxId;
	this.boxWidth=json.boxWidth;
	this.boxHeight=json.boxHeight;
	this.times=json.times;
	this.imgArr=json.imgArr;
	this.imgWidth=json.imgWidth;
	this.imgHeight=json.imgHeight;
	this.zoomColor=json.zoomColor;
	this.zoomWidth=json.zoomWidth;
	this.zoomHeight=json.zoomHeight;
	this.listWidth=json.listWidth;
	this.listHeight=json.listHeight;
	this.listBorderColor=json.listBorderColor;
	this.listBorderHeighColor=json.listBorderHeighColor;
	this.listSpace=json.listSpace;	
	this.listNum=json.listNum;
	this.btnWidth=json.btnWidth;
	this.btnColor=json.btnColor;
	this.btnFontSize=json.btnFontSize;
	this.btnFontColor=json.btnFontColor;
	this.btnFontHeighColor=json.btnFontHeighColor;
	this.distance=0;
	this.nextTimer=null;
	this.previousTimer=null;
	if(typeof this.initUI!="function"){
		ShowGoods.prototype.initUI=function(){
			$(this.boxId).css({position:'relative',height:this.boxHeight+'px',width:this.boxWidth+'px'});
			var str="<div style='width:"+this.imgWidth+"px;height:"+this.imgHeight+"px;padding-bottom:"+(this.boxWidth-this.imgWidth-this.listHeight)+"px;margin-left:auto;margin-right:auto;position:relative'><img src="+this.imgArr[0]+" style='width:"+this.imgWidth+"px;height:"+this.imgHeight+"px'/>";
			str+="<div style='width:"+this.zoomWidth+"px;height:"+this.zoomHeight+"px;background:yellow;opacity:.3;cursor:move;position:absolute;top:0;left:0;display:none'></div></div>";
			str+="<div style='width:"+this.imgWidth+"px;height:"+this.imgHeight+"px;display:none;position:absolute;top:0;left:"+this.boxWidth+"px;overflow:hidden'><img src="+this.imgArr[0]+" style='position:absolute;width:"+this.imgWidth*this.times+"px;height:"+this.imgHeight*this.times+"px'/></div>";
			str+="<div style='position:relative;overflow:hidden;width:"+((this.listWidth+this.listSpace)*this.listNum-this.listSpace)+"px;height:"+this.listHeight+"px;margin:0 auto'>";
			str+="<ul style='position:absolute;top:0;left:0;width:"+((this.listWidth+this.listSpace)*this.imgArr.length)+"px;height:"+this.listHeight+"px'>";
			for(var i=0;i<this.imgArr.length;++i){
				str+="<li style='box-sizing:border-box;border:2px solid"+ this.listBorderColor+";width:"+this.listWidth+"px;height:"+this.listHeight+"px;margin-right:"+this.listSpace+"px;list-style:none;float:left;'><img src="+this.imgArr[i]+" style='width:100%;height:100%'/></li>"
			}
			str+="</ul>";
			str+="<input type='button' style='position:absolute;cursor:pointer;background:"+this.btnColor+";opacity:.5;border:none;width:"+this.btnWidth+"px;height:"+this.listHeight+"px;top:0;left:0px;color:"+this.btnFontColor+";font-size:"+this.btnFontSize+"px;outline:none' value='\<'/>"
			str+="<input type='button' style='position:absolute;cursor:pointer;background:"+this.btnColor+";opacity:.5;border:none;width:"+this.btnWidth+"px;height:"+this.listHeight+"px;top:0;left:"+((this.listWidth+this.listSpace)*this.listNum-this.listSpace-this.btnWidth)+"px;color:"+this.btnFontColor+";font-size:"+this.btnFontSize+"px;outline:none' value='\>'/>"
			str+="</div>";
			$(this.boxId).append(str)
		}
		ShowGoods.prototype.addEvent=function(){
			var that=this;
			$(this.boxId+" input:eq(1)").on({
				click:function(){
					var left=Math.round(parseFloat($(that.boxId).find('ul').css('left')));
					if(left%(that.listWidth+that.listSpace)!=0)return
					function next(){
						var nowLeft = Math.round(parseFloat($(that.boxId).find('ul').css('left')));
						that.distance=(left-that.listWidth-that.listSpace-nowLeft)/2;
						that.distance = that.distance>0?Math.ceil(that.distance):Math.floor(that.distance);
						if(nowLeft+that.distance<=-(that.imgArr.length-that.listNum)*(that.listWidth+that.listSpace)+that.listSpace){
							$(that.boxId).find('ul').css('left',(-(that.imgArr.length-that.listNum)*(that.listWidth+that.listSpace))+'px');
							$(that.boxId+" input:eq(1)").css('color',that.btnFontColor);//这里this指向的是that因为setTimeout里用bind绑定到了that
							return
						}
						$(that.boxId).find('ul').css('left',nowLeft+that.distance+'px');
						if(nowLeft+that.distance==left-that.listWidth-that.listSpace)return			
						setTimeout(next.bind(that),50)	
					}
					next()
				},
				mouseover:function(){
					if(Math.round(parseFloat($(that.boxId).find('ul').css('left')))<=-(that.imgArr.length-that.listNum)*(that.listWidth+that.listSpace)+that.listSpace){
						return
					}
					$(this).css('color',that.btnFontHeighColor)
					},
					mouseout:function(){
						$(this).css('color',that.btnFontColor)
					}
				});
			$(this.boxId+" input:eq(0)").on({
				click:function(){
					var left=Math.round(parseFloat($(that.boxId).find('ul').css('left')));
					if(left%(that.listWidth+that.listSpace)!=0)return
					function previous(){
						var nowLeft = Math.round(parseFloat($(that.boxId).find('ul').css('left')));
						that.distance=(left+that.listWidth+that.listSpace-nowLeft)/2;
						that.distance = that.distance>0?Math.ceil(that.distance):Math.floor(that.distance);
						if(nowLeft+that.distance>=0){
							$(that.boxId).find('ul').css('left',0+'px');
							$(that.boxId+" input:eq(0)").css('color',that.btnFontColor);	
							return
						}	
						$(that.boxId).find('ul').css('left',nowLeft+that.distance+'px');
						if(nowLeft+that.distance==left+that.listWidth+that.listSpace)return
						setTimeout(previous.bind(that),50)	
					}
					previous()
				},
					mouseover:function(){
						if(Math.round(parseFloat($(that.boxId).find('ul').css('left')))>=0){
							return
						}
						$(this).css('color',that.btnFontHeighColor)
					},
					mouseout:function(){
						$(this).css('color',that.btnFontColor)
					}			
				});
			$(this.boxId+" ul").on({
				mouseover:function(){
					$(this).css('borderColor',that.listBorderHeighColor)
				},
				mouseout:function(){
					$(this).css('borderColor',that.listBorderColor)
				},	
				click:function(){
					$(that.boxId+">div:eq(0)>img").attr('src',$(this).children('img').attr('src'));
					$(that.boxId+">div:eq(1)>img").attr('src',$(this).children('img').attr('src'));
				}
			
			},'li');
			$(this.boxId+" div:eq(0)").on({
				mouseenter:function(){
					$(this).children('div').css('display','block');
					$(this).next().css('display','block');
				},
				mousemove:function(e){
					var offsetLeft=$(this).offset().left;
					var offsetTop=$(this).offset().top;
					var X=e.pageX-that.zoomWidth/2-offsetLeft;
					var Y=e.pageY-that.zoomHeight/2-offsetTop;
					X = X < 0 ? 0 : X;
					Y = Y < 0 ? 0 : Y;
					X = X > that.imgWidth-that.zoomWidth?that.imgWidth-that.zoomWidth:X;
					Y = Y > that.imgHeight-that.zoomHeight?that.imgHeight-that.zoomHeight:Y;		
					$(this).children('div').css({left:X+'px',top:Y+'px'});
					var bX=X*that.times;
					var bY=Y*that.times;
					if(that.times*that.imgWidth-bX<=that.imgWidth){
						bX=that.times*that.imgWidth-that.imgWidth;
					}
					if(that.times*that.imgHeight-bY<=that.imgHeight){
						bY=that.times*that.imgHeight-that.imgHeight;
					}
					$(this).next().children().css({left:-bX+'px',top:-bY+'px'});	
				},					
				mouseleave:function(){
					$(this).children('div').css('display','none');
					$(this).next().css('display','none');
				}
			});
		}	
	}
	this.initUI();
	this.addEvent();
}
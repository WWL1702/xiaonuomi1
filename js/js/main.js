require(['bigMirror'],function(bigMirror){
	  
		$("#footer").load("footer.html");
		     //console.log(document.cookie)
				$.get("getGoodsInfo.php",{goodsId:getCookie("goodsId")},function(data){
				   var obj=eval('('+data+')')
				$("#goodsId").html(obj.goodsId);
				$("#jiage").html(obj.goodsPrice);
				$("#miaoshu").html(obj.goodsDesc);
				$("#imgs").attr("src",obj.goodsImg);
				$("#imgss").attr("src",obj.goodsImg);
				$("#mingcheng").html(obj.goodsName);
				var img=obj.goodsImg;
				new bigMirror.BigMirrors(
						{
							boxId:".box1",
							mirrorWidth:50,
							mirrorHeight:50,
							multiple:5,
							direction:"右",
							bigImgPath:img
						}
					);
				
			});
	
	
});

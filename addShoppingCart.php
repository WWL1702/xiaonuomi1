<?php
	header("Content-Type:text/html;charset=utf-8");
	//1、接受客户端的数据（用户输入的数据）
	$vipName   = $_REQUEST['vipName'];
	$goodsId   = $_REQUEST['goodsId'];
	$goodsCount = $_REQUEST['goodsCount'];
	
	//2、数据保存在数据库中
	//1）、建立连接（搭桥）
	$conn = mysql_connect("localhost","root","root");
	
	//2）、选择数据库（找目的地）
	mysql_select_db("wl",$conn);
	
	//3）、传输数据（过桥）
	$Sql="select * from shoppingCart where vipName='".$vipName."' and  goodsId='".$goodsId."'";	
	$result=mysql_query($Sql,$conn);	
	$rows=mysql_fetch_array($result);
	//如果有值当值 执行修改
	if($rows){
		$count=$rows['goodsCount'];
		$goodsCount=$goodsCount+$count;
			//如果有执行添加事件
			$sqlstr = "update shoppingCart set goodsCount=".$goodsCount." where vipName='".$vipName."' and goodsId='".$goodsId."'";			
			$result=1;
			if(!mysql_query($sqlstr,$conn)){
				$result=0;
			}
			mysql_close($conn);
			echo $result;
	}else{
		//如果没有执行添加事件
		$sqlstr = "insert into shoppingCart values('".$vipName."','".$goodsId."',".$goodsCount.")";

		$result=1;
		if(!mysql_query($sqlstr,$conn)){
				$result=0;
		}
		mysql_close($conn);
		echo $result;
	}
?>
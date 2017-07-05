<?php
    $userName=$_GET["userName"];
    
    
    header("Content-type","text/html;charset=utf-8");
	//1.建立连接
	$con=mysql_connect("localhost","root","root");
	
	//2.选择数据库
	mysql_select_db("mydb1702",$con);
	
	$sqlStr ="select * from userInfo where userName='".$userName."'";
	/*$sqlStr ="insert into userInfo(userName,userpass) values('".$userName."','".$userpass."')";*/
    
    $result = mysql_query($sqlStr,$con);
	$rows = mysql_num_rows($result);
	
	mysql_close($con);
    
	if($rows==0){
		echo "1";
	}else{
		echo "0";
	}
?>
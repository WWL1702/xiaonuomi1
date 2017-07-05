<?php
    $userName=$_POST["userName"];
    $userPass=$_POST["userPass"];
    
    header("Content-type","text/html;charset=utf-8");
	//1.建立连接
	$con=mysql_connect("localhost","root","root");
	
	//2.选择数据库
	mysql_select_db("mydb1702",$con);
	$sqlStr ="insert into userInfo(userName,userPass) values('".$userName."','".$userPass."')";
    mysql_query($sqlStr,$con);
	mysql_close($con);
    echo "<a href='index.html'>进入主页</a>";

?>
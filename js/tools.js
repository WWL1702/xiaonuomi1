//定义了一个tools模块
define([],function(){
	function $(id){
		return document.getElementById(id);
	}
	
	function $create(tagName){
		return document.createElement(tagName);
	}	
	
	return {
		$:$,
		$create:$create
	}
});


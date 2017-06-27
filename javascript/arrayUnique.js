var arr=[1,2,2,3,4,5,6,7,7,6,5,4,4,3];

Array.prototype.unique=function(){
	var _this=this;
	var newArr=[];
	for(var i=0;i<_this.length;i++){
		if(newArr.indexOf(_this[i])===-1){
			newArr.push(_this[i]);
		}
	}
	return newArr;
}
arr.unique();

Array.prototype.unique2=function(){
	var _this=this;
	var obj={};
	var newArr=[];
	for(var i=0;i<_this.length;i++){
		if(!obj[arr[i]]){
			newArr.push(arr[i]);
			obj[arr[i]]=1;
		}
	}
	return newArr;
}
arr.unique2();
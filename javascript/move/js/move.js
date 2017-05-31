
// 获取样式
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}

/***运动函数
	@parmas obj 运动对象
	@params json 运动属性，(json格式)
	@params fn  回调函数
***/
function move(obj,json,fn){
	var flag=true; 
	clearInterval(obj.timer);

	obj.timer=setInterval(function(){

		for(var attr in json){

			var iCur=0;

			if(attr=="opacity"){
				iCur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}

			var speed=(json[attr]-iCur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);

			// 判断是否所有属性动画已完成
			if(iCur != json[attr]){
				flag=false;
			} 

			if(attr=="opacity"){
				obj.style.opacity=(iCur+speed)/100;
			}else{
				obj.style[attr]=iCur+speed+"px";
			}
			
			if(flag){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		}
	},30);
}

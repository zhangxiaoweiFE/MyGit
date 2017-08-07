function Lotto(opt){

	this.lotto        = opt.lotto ;  //转盘
	this.canvas       = opt.canvas;  //转盘背景
	this.amount       = opt.amount || 8;  //奖品数
	this.radius       = opt.radius || this.canvas.width/2;  //转盘半径
	this.fillStyle    = opt.fillStyle || "#FAF3E9";  //转盘背景色
	this.strokeStyle  = opt.strokeStyle || "#8D462A";  //线条颜色
	this.ul           = opt.ul;       //奖品列表ul
	this.callBack     = opt.callBack;   //回调函数

	this.init();
	this.bindCallback();
}

Lotto.prototype.init=function(){
	this.drawBg();
	this.drawLine();
	this.drawLi();
	if(this.amount%2 == 0){
		this.canvas.style.transform="rotate("+ (360/this.amount/2) +"deg)";
	}
}

/* draw the dial---method1*/
Lotto.prototype.drawBg=function(){
	var ctx=this.canvas.getContext("2d");
	var centerX=centerY=this.canvas.width/2;
	ctx.fillStyle=this.fillStyle;
	ctx.strokeStyle=this.strokeStyle;

	ctx.beginPath();
	ctx.save();
	ctx.translate(centerX,centerY);
	ctx.arc(0, 0, this.radius, 0,  2 * Math.PI, false);
	ctx.fill();
	ctx.restore();
}
Lotto.prototype.drawLine=function(){
	var ctx=this.canvas.getContext("2d");
	var centerX=centerY=this.canvas.width/2;
	ctx.fillStyle=this.fillStyle;
	ctx.strokeStyle=this.strokeStyle;

	for(var i=0;i<this.amount;i++){
		var sx=Math.sin(360/this.amount *i * Math.PI/180 )*this.radius;
		var sy=Math.cos(360/this.amount *i * Math.PI/180 )*this.radius;
		ctx.beginPath();
		ctx.save();
		ctx.translate(centerX,centerY);
		ctx.moveTo(sx,sy);
		ctx.lineTo(0,0);
		ctx.stroke();
		ctx.restore();
	}
}
/* draw the dial method1 end */


/* draw the dial  method2*/
Lotto.prototype.drawDial=function(i){
	var ctx=this.canvas.getContext("2d");
	var centerX=centerY=this.canvas.width/2;
	ctx.fillStyle=this.fillStyle;
	ctx.strokeStyle=this.strokeStyle;
	ctx.beginPath();
	for(var i=0;i<this.amount;i++){
		ctx.save();
		ctx.translate(centerX,centerY);
		ctx.moveTo(0,0);
		ctx.rotate((360 / this.amount *i + 360/this.amount/2 ) * Math.PI/180);
		ctx.arc(0, 0, this.radius , 0,  2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}

}
/* draw the dial method2 end */

Lotto.prototype.drawLi=function(){
	var frag=document.createDocumentFragment();
	for(var i=0;i<this.amount;i++){
		var li=document.createElement("li");
		li.innerText=i+1;
		li.style.transform="rotate("+ (360/this.amount*i) +"deg) translate3d(0,-180px,0)";
		frag.appendChild(li);
	}

	this.ul.appendChild(frag);
}

Lotto.prototype.runTo=function(index){
	var that=this;
	that._index=index;
	var target= 360*5 - 360/this.amount*(index-1);
	this.lotto.style.transform="rotate(" + target + "deg)";
}

Lotto.prototype.bindCallback=function(){
	var that = this;
	if('function' === typeof that.callBack) {
		that.lotto.addEventListener('webkitTransitionEnd', function(e) {
			e.preventDefault();
			that.callBack(that._index);
		});
	}
}





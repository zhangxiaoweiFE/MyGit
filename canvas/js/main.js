var cvs;
var ctx;
var w;
var h;
var bgPic = new Image();
var starPic = new Image();


var bgW=352;
var bgH=220;

var nums=30;
var stars=[];
var deltaTime;
var lastTime;
var alive = 0;

var switchy = false;

function init(){
	cvs=document.getElementById("canvas");
	ctx=cvs.getContext("2d");

	w=cvs.width;
	h=cvs.height;
	
	document.addEventListener('mousemove', mousemove, false);

	bgPic.src="img/kb.jpg";
	starPic.src="img/star.png";

	for (var i = 0; i < nums; i++) {
		var obj=new objStar();
		stars.push(obj);
		stars[i].init();
	}
	lastTime = Date.now();
	loop();
}

function drawBg(){
	ctx.fillStyle="#010001";
	ctx.fillRect(0,0,w,h);
}

function loop(){

	window.requestAnimationFrame(loop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	drawBg();
	drawImg();
	drawStar();
	aliveUpdate();
}

function drawImg(){
	ctx.drawImage(bgPic,100,100,bgW,bgH);
}

function mousemove(e) {
	if (e.offsetX || e.layerX) {

		var px = e.offsetX == undefined ? e.layerX : e.offsetX;
		var py = e.offsetY == undefined ? e.layerY : e.offsetY;

		if (px > 100 && px < (100 + bgW) && py > 100 && py < (100 + bgH)) {
			switchy = true;
		} else {
			switchy = false;
		}
	}
}
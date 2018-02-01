

var objStar=function(){
	this.x;
	this.y;
	this.no;
	this.ySpd;

	this.timer;

	this.beta;
}

objStar.prototype.init=function(){
	this.x=Math.random()*bgW + 100;
	this.y=Math.random()*bgH + 100;
	this.ySpd = Math.random() * 0.6 - 0.3; //[0,2) [-1, 1)
	this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)
	this.no=Math.floor(Math.random() * 7);
	this.timer = 0;
	this.beta = Math.random() * Math.PI * 0.5;
}
objStar.prototype.update=function(){
	this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)
	this.x += this.xSpd;
	this.y += this.ySpd;
	if (this.x > (100 + bgW) || this.x < (100 - 10))
		this.init();
	else if (this.y > (100 + bgH) || this.y < (100 - 10))
		this.init();

	this.timer += deltaTime;
	if(this.timer>30){
		this.no += 1;
		this.no %= 7;
		this.timer = 0;
	}
}
objStar.prototype.draw=function(){
	this.beta += deltaTime * 0.005;
	ctx.save();
	ctx.globalAlpha = Math.sin(this.beta) * alive;
	ctx.drawImage(starPic,this.no*7,0,7,7,this.x,this.y,7,7);
	ctx.restore();
}

function drawStar(){
	for(var i=0;i<nums;i++){
		stars[i].update();
		stars[i].draw();
	}
}

function aliveUpdate() {
	if (switchy) {
		alive += 0.03;
		if (alive > 0.7) {
			alive = 0.7;
		}
	} else {
		alive -= 0.03;
		if (alive < 0) {
			alive = 0;
		}
	}
}
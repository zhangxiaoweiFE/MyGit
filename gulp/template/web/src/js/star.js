/*
* @Author: lungin
* @Date:   2017-05-27 13:44:32
* @Last Modified by:   lungin
* @Last Modified time: 2017-05-27 13:50:27
*/

function starCanvas(starX,starY,type) {
    this.step = 1;
    this.size = starBase[type];
    this.starScale = this.decimal(Math.random());
    this.x = starX;
    this.y = starY;
    this.width = 0;
    this.height = 0;
    this.opacity = this.decimal(Math.random());
    this.canvas = {};
    this.starPattern = new Image();
    this.starPattern.src = "img/light_0" + type + ".png";
    this.init();
}
starCanvas.prototype = {
    init:function () {
        var ctx = document.getElementById('stars');
        this.canvas = ctx.getContext('2d');
        this.width=ctx.width;
        this.height=ctx.height;
    },
    rand:function (min,max) {
        return Math.floor(Math.random() * (max-min+1)+min);
    },
    decimal:function (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x*100)/100;
        return f;
    },
    play:function () {
        if(this.opacity <= 0.01){
            this.step = -1;
        }else if(this.opacity >= 0.99){
            this.step = 1;
        }
        this.opacity = this.decimal((this.opacity - (this.step * 0.01)));
        this.canvas.globalAlpha = this.opacity;
        this.canvas.beginPath();
        this.canvas.save();
        this.canvas.translate(this.x,this.y);
        this.canvas.fillStyle = this.canvas.drawImage(this.starPattern,0,0,this.starScale * this.size,this.starScale * this.size);
        this.canvas.fill();
        this.canvas.restore();
    }
};

function starsPlay(){
    starArr[0].canvas.clearRect(0,0,1920,1023);
    starArr.forEach(function(e){
        e.play();
    });
    requestAnimationFrame(starsPlay);
}

var starArr = [], starBase = [44, 56, 18];
for(var i = 0; i < 2; i++){
  starArr[i] = new starCanvas(Math.floor(Math.random()*1201+360),Math.floor(Math.random()*408+52),0);
  starArr[i].play();
}
for(var i = 2; i < 4; i++){
  starArr[i] = new starCanvas(Math.floor(Math.random()*1201+360),Math.floor(Math.random()*408+52),1);
  starArr[i].play();
}
for (var i = 4; i < 200; i++) {
    starArr[i] = new starCanvas(Math.floor(Math.random()*1920),Math.round(Math.random()*1023),2);
    starArr[i].play();
}

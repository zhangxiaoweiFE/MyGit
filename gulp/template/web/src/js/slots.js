/**
 * Created by zhangruojun on 2016/06/15.
 */


function Slots(opts) {
	this.$ele         = opts.$ele;							//老虎机
	this.$item        = this.$ele.find(opts.itemClass);	    //滚筒
	this.childClass   = opts.childClass;				    //滚筒里的奖项类名
	this.space        = opts.space;						    //滚筒的高度
	this.usedTime     = opts.usedTime || 4000; 			    //最短耗时
	this.speed        = opts.speed;  						//滚动的速度，px/40ms 
	this.gapTime      = opts.gapTime || 100;				//每个滚筒开始滚动间隔时间
	this.initPos      = opts.initPos;						//初始位置

	this._moveTimer   = [];							        //计时器数组
	this._toStop      = false;							    //是否停止滚动
	this._isRunning   = false;						        //滚筒在滚动中
	this._timerCouter = 0;							        //计时器索引值，停止时用到
	this._itemLength  = this.$item.length; 			        //滚筒个数


	if(opts.initPos) {
		this._init(opts.initPos);
	}
}

//初始化
Slots.prototype._init = function(posArr) {

	var that = this;

	for(var i = 0; i < that._itemLength; i += 1) {

		var curItem = that.$item.eq(i),
			pos = posArr[i];

		that._setPosition(curItem, pos);
	}
}

/* 设置位置
 * curItem: 滚筒
 * pos    : 位置
 */
Slots.prototype._setPosition = function(curItem, pos) {

	var that = this;

	var children = curItem.find(that.childClass);

	for(var j = 0, l = children.length; j < l; j += 1) {

		var _top = (j - pos) * that.space;
		_top = _top > 0 ? (- pos - children.length + j) * that.space : _top;
		
		children.eq(j).css('top', _top);
	}
}

/* 开始滚动
 * posArr : 每个滚筒的最终奖项
 * startCb: 开始回调
 * stopCb : 停止回调
 */
Slots.prototype.runto = function(posArr, startCb, stopCb) {

	var that = this;

	//当前滚筒并没有在滚动中才允许滚动
	if(!that._isRunning) {

		that.reset();

		that._isRunning = true;

		for(var i = 0; i < that._itemLength; i+=1) {
			var curItem = that.$item.eq(i);
			that._startRun(i, curItem, posArr[i], stopCb);
		}

		setTimeout(function() {
			that._toStop = true;
		}, that.usedTime);

		if('function' === typeof startCb) {
			startCb();
		}	
	}

	
	
}

/* 计时器开始
 * index : 滚筒索引
 * item  : 滚筒本身
 * pos   : 滚筒最终停止位置
 * stopCb: 停止回调
 */
Slots.prototype._startRun = function(index, item, pos, stopCb) {

	var that = this;

	setTimeout(function() {

		that._moveTimer[index] = setInterval(function() {

			var children = item.find(that.childClass);

			for(var j = 0, l = children.length; j < l; j += 1) {

				var _top = +children.eq(j).css('top').replace('px', '') + that.speed[index];		

				if(_top >= that.space) {
					_top = (-children.length + 1) * that.space;
				}
				children.eq(j).css('top', _top);

				if(that._toStop && _top > -that.speed[index] && _top < that.speed[index] && j === pos && index === that._timerCouter) {
					
					that._setPosition(that.$item.eq(index), pos);

					clearInterval(that._moveTimer[index]);
					that._timerCouter += 1;

					//最后一个计时器停止，所有滚筒停止滚动
					if(that._timerCouter == that._itemLength) {
						that._isRunning = false;
						if('function' === typeof stopCb) {
							stopCb();
						}
					}

					break;

				}
			}
		}, 40);
	}, that.gapTime * index);	//index * 40, 每个滚筒开始滚动间隔时间
}

/* 重置数据
 ***********
 */
Slots.prototype.reset = function() {

	var that = this;

	for(var i =0, len = that._moveTimer.length; i < len; i += 1) {
		clearInterval(that._moveTimer[i]);
	}

	that._toStop = false;

	that._isRunning = false;

	that._timerCouter = 0;

	that._init(that.initPos);

}
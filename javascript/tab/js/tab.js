(function($){

	var Tab=function(tab){

		var _this=this;

		// 保存单个tab组件
		this.tab=tab;

		this.config={
			// 触发事件
			"triggerType":"click",
			// 切换效果
			"effect":"default",
			// 默认显示第几个
			"invoke":1,
			// 是否自动轮播
			"auto":false
		}

		if(this.getConfig()){
			$.extend(true, this.config, this.getConfig());
		}


		this.tabItems=this.tab.find(".tab-nav li");
		this.tabConts=this.tab.find(".tab-cont");

		var config=this.config;

		if(config.triggerType==="click"){
			this.tabItems.bind(config.triggerType, function(event) {
				_this.invoke($(this));
			});
		}else{
			this.tabItems.bind("mouseover", function(event) {
				_this.invoke($(this));
			});
		}

		if(config.auto){
			this.timer=null;
			this.loop=0;

			_this.autoPlay();

			this.tab.hover(function(){
				clearInterval(_this.timer);
			},function(){
				_this.autoPlay();
			});
		}

		if(config.invoke){
			this.invoke(this.tabItems.eq(config.invoke-1));
		}

	}


	Tab.prototype={

		getConfig:function(){

			var config=this.tab.attr("data-config");

			if(config&&config!=""){
				return $.parseJSON(config);
			}else{
				return null;
			}
		},

		invoke:function(curItem){
			var idx=curItem.index();
			var effect=this.config.effect;

			curItem.addClass("active").siblings().removeClass('active');

			if(effect==="fade"){
				this.tabConts.eq(idx).fadeIn().siblings().fadeOut();
			}else{
				this.tabConts.eq(idx).addClass('cur').siblings().removeClass('cur');
			}

			if(this.config.auto){
				this.loop=idx;
			}

		},

		autoPlay:function(){
			var __this=this;
			var config=this.config;
			var tabItems=this.tabItems;
			var len=tabItems.size();

			this.timer=setInterval(function(){

				__this.loop++;
				if(__this.loop>=len ){
					__this.loop=0;
				}

				tabItems.eq(__this.loop).trigger(config.triggerType);

			},config.auto);

		}

	}


	$.fn.extend({
		tab:function(){
			this.each(function(index, el) {
				new Tab($(this));
			});

			return this;
		}
	})

	window.Tab=Tab;

})(jQuery);
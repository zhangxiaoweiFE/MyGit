<template>
	<div class="wrap-lotto">
		<div class="main-lotto">
			<div class="notice-wp">
				<i class="icon-lott-horn"></i>
				<div class="notice-list">
					<ul>
						<li v-for="item in lists">恭喜玩家{{item.username}}，抽到{{item.priz}}</li>
					</ul>
				</div>
				<div class="user-menu">
					<div class="user-avatar" @click="dropShow">
						<img src="../../static/img/user.png">
					</div>
					<div class="drop-menu" v-show="showDrop">
						<ul>
							<li><a href="javascript:;" class="assets">
								<i class="coin coin32"></i>
								<span>9999.99万</span>
								<i class="icon-lott-add"></i>
							</a></li>
							<li><a href="javascript:;">兑换记录</a></li>
							<li><a href="javascript:;">规则说明</a></li>
							<li><router-link to="/">返回首页</router-link></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="ban-recharge">
				<a href="#"><img src="../../static/images/recharge.png" alt="话费充值"></a>
			</div>
			<div class="lotto-list-wp">
				<div class="lotto-list">
					<div>
						<h3><i class="icon-lott-clock"></i>限时抽奖</h3>
						<ul class="clearfix">
							<li v-for="val in lotto">
								<span class="inventory">剩{{val.nums}}份</span>
								<div class="img-lotto">
									<img :src="val.img">
								</div>
								<p>{{val.txt}}</p>
								<a href="#" class="btn-exchange">
									<span class="coin coin32"></span>
									<span>{{val.price}}</span>
								</a>
								<i class="icon-lott-sellout" v-show="val.sellout"></i>
							</li>
						</ul>
					</div>
					<div>
						<h3><i class="icon-lott-goods"></i>抽奖商品</h3>
						<ul class="clearfix">
							<li v-for="val in lotto" :class="{dis:val.sellout}">
								<span class="inventory">剩{{val.nums}}份</span>
								<div class="img-lotto">
									<img :src="val.img">
								</div>
								<p>{{val.txt}}</p>
								<a href="#" class="btn-exchange">
									<span class="coin coin32"></span>
									<span>{{val.price}}</span>
								</a>
								<i class="icon-lott-sellout" v-show="val.sellout"></i>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"Lotto",
		data(){
			return {
				showDrop:false,
				lists:[
					{"username":"我爱吹泡泡泡泡", "priz":"10Q币"},
					{"username":"我是VIP", "priz":"10Q币"}
				],
				lotto:[
					{ nums:0, img:"../../static/images/goods1.png", txt:"电信话费卡 (10元)", price:"3400", sellout:false },
					{ nums:1, img:"../../static/images/goods2.png", txt:"电信话费卡 (20元)", price:"3400", sellout:false },
					{ nums:2, img:"../../static/images/goods3.png", txt:"电信话费卡 (30元)", price:"3400", sellout:true },
					{ nums:3, img:"../../static/images/goods4.png", txt:"电信话费卡 (40元)", price:"3400", sellout:false }
				],

			}
		},
		methods:{
			dropShow() {
				this.showDrop=!this.showDrop;
			}
		}
	}
</script>
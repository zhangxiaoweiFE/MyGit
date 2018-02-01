<template>
	<section>
		<div class="sec-hd">
			<h2><span class="icon icon-goods"></span>抽奖商品</h2>
			<div class="more">
				<a href="javascript:;">更多商品 &gt;</a>
			</div>
		</div>
		<div class="sec-goods">
			<div class="goods-list">
				<ul class="clearfix">
					<li v-for="val in goods">
						<span class="inventory">剩{{val.inventory}}份</span>
						<p class="limited" v-show="val.limited">限时抽奖</p>
						<div class="img-goods">
							<img :src="val.img">
						</div>
						<p>{{val.txt}}</p>
						<a href="javascript:;" class="btn-exchange">
							<span v-show="val.price">￥{{val.price}} +</span>
							<span class="coin coin32"></span>
							<span>{{val.coins}}</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>


<script>
	export default {
		name:  "Lotto",
		data() {
			return {
				goods:[
					{
						inventory:0,
						img:"../../static/images/goods1.png",
						txt:"Q币（15个）",
						price:"",
						coins:"1900",
						limited:true
					},
					{
						inventory:0,
						img:"../../static/images/goods2.png",
						txt:"电信话费卡 (30元)",
						price:"",
						coins:"3400",
						limited:false
					},
					{
						inventory:0,
						img:"../../static/images/goods3.png",
						txt:"OPPO R9 64G",
						price:"2000",
						coins:"1900",
						limited:false
					},
					{
						inventory:0,
						img:"../../static/images/goods4.png",
						txt:"迅雷白金会员1个月",
						price:"8",
						coins:"1300",
						limited:false
					}
				]
			}
		}
	}
</script>
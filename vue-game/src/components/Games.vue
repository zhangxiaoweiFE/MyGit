<template>
	<section>
		<div class="sec-hd">
			<h2><span class="icon icon-games"></span>精彩玩法</h2>
		</div>
		<div class="sec-games">
			<ul class="clearfix">
				<li class="img-game" v-for="item in listGame">
					<a href="#"><img :src="item.img" :alt="item.tit"></a>
					<p class="hide-txt">{{item.tit}}</p>
				</li>
			</ul>
		</div>
	</section>
</template>	

<script>
	export default{
		name:"sec",
		data(){
			return {
				listGame:[
					{"img":"../../static/images/game1.jpg", "tit":"猫狗大战"},
					{"img":"../../static/images/game2.jpg", "tit":"动物酷跑"},
					{"img":"../../static/images/game3.jpg", "tit":"每日猜猜乐"}
				]
			}
		}
	}
</script>
<template>
	<section>
		<div class="sec-hd">
			<h2><span class="icon icon-guess"></span>每日必猜</h2>
			<div class="more">
				<a href="javascript:;">更多话题 &gt;</a>
			</div>
		</div>
		<!-- 竞猜题目 -->
		<div class="sec-guess">
			<div class="sec-guess-cont">
				<img :src="guess.imgUrl" >
				<p class="guess-topic">{{guess.topic}}</p>
			</div>
		</div>
		<!-- 选项 -->
		<div class="sec-guess-opt">
			<a href="javascript:;" v-for="(val,index) in guess.opts.item" :class="{on:val.isSelt}" @click="selt(index)">
				<span>{{val.id}}</span>
				<span>{{val.cont}}</span>
			</a>
		</div>	
		<!-- 投注 -->
		<div class="sec-bet">
			<ul class="clearfix">
				<li class="bet-item" v-for="(val,index) in bets" :class="{on:val.isBet}" @click="bet(index)">
					<a href="javascript:;">
						<i class="coin coin78"></i>
						<span>{{val.amount}}</span>
					</a>
				</li>
			</ul>
			<a href="javascript:;" class="btn-bet">投注</a>
		</div>
	</section>
</template>

<script>
	export default{
		name: "Guess",
		data() {
			return {
				guess:{
					"imgUrl":"https://dummyimage.com/600x314/21b4fd/ffffff.png",
					"topic":"影片《银河护卫队》中国票房在上线10天能否达到10亿？",
					"opts":{
						"nums":4,
						"item":[
							{ "id":"A" , "cont":"1.67" ,"isSelt":true },
							{ "id":"B" , "cont":"1.67" ,"isSelt":false },
							{ "id":"C" , "cont":"1.67" ,"isSelt":false },
							{ "id":"D" , "cont":"1.67" ,"isSelt":false }
						]
					}
				},
				bets:[
					{ "amount":10, "isBet":false },
					{ "amount":100, "isBet":true },
					{ "amount":500, "isBet":false }
				]
				
			}
		},
		methods:{
			selt(index){
				for(let i=0;i<this.guess.opts.item.length;i++){
					this.guess.opts.item[i].isSelt=false
				}
				this.guess.opts.item[index].isSelt=true
			},
			bet(index){
				for(let i=0;i<this.bets.length;i++){
					this.bets[i].isBet=false
				}
				this.bets[index].isBet=true
			}
		}
	}
</script>

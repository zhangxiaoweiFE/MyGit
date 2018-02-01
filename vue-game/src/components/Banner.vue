<template>
	<div class="banner">
		<h1 class="titl hide-txt">迅雷活动猜猜乐</h1>
		<div class="qrcode" style="display: ;">
			<p class="qrcode-txt hide-txt"></p>
			<a href="#" class="close" title="关闭"></a>
		</div>
		<div class="tips-wp">
			<i class="icon speaker1"></i>
			<i class="icon speaker2"></i>
			<div class="tips-list">
				<ul>
					<li v-for="item in lists">恭喜玩家{{item.username}}，兑奖{{item.priz}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"Banner",
		data(){
			return {
				lists:[
					{"username":"我爱吹泡泡泡泡", "priz":"10Q币"},
					{"username":"我是VIP", "priz":"10Q币"}
				]
			}
		}
	}
</script>
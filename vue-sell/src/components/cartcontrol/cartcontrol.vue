<template>
	<div class="cartcontrol">
		<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
			<a href="#" class="icon-decrease"> - </a>
		</div>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add" @click.stop.prevent="addCart">
			<a href="#" class="icon-add">+</a>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";

	export default {
		props: {
			food: {
				type:Object
			}
		},
		methods: {
			addCart(event) {
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
			},
			decreaseCart(event) {
				if(!event._constructed){
					return;
				}
				this.food.count--;
			}
		}
	}
</script>

<style scoped>
	.cart-decrease,.cart-count,.cart-add{
		display: inline-block;
		vertical-align: top;
		padding:6px;
		line-height: 24px;
		color:rgb(0,160,220);
		text-align:center;
	}
	.icon-add{
		display: block;
		width: 18px;
		height: 18px;
		line-height: 18px;
		border-radius:50%;
		background: #00A0DC;
		color:#fff;
	}
	.icon-decrease{
		display: block;
		width: 18px;
		height: 18px;
		line-height: 14px;
		border-radius:50%;
		background:#fff;
		color:#00A0DC;
		border:1px solid #00A0DC;
		box-sizing: border-box;
		animation:slideIn .5s both;
	}
	.cart-count{
		padding-top: 10px;
		line-height: 10px;
		font-size: 10px;
		color:rgb(147,153,159);
	}

	
	@keyframes slideIn{
		0%{
			opacity: 0;
			transform:translate3d(100%,0,0) rotate(360deg);
		}
		100%{
			opacity: 1;
			transform:translate3d(0,0,0) rotate(0);
		}
	}
</style>
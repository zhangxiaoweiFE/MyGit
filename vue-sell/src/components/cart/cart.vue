<template>
	<div>
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wraper">
						<span class="logo-cart" :class="{'highLight':totalCount>0}"></span>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费{{deliveryPrice}}元</div>
				</div>
				<div class="content-right">
					<div class="pay" :class="{'highLight':totalPrice>=minPrice}" @click.stop.prevent="pay()">{{payDesc}}</div>
				</div>
			</div>
			<div class="shopcart-list" v-show="listShow" >
				<div class="list-header">
					<h2 class="title">购物车</h2>
					<span class="empty" @click="empty()">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li v-for="food in selectFoods" class="food">
							<span class="name">{{food.name}}</span>
							<div class="price" >
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>	
		</div>
		<div class="list-mask" v-show="listShow" @click="hideList"></div>
	</div>
</template>

<script>
	import cartcontrol from "@/components/cartcontrol/cartcontrol";

	import BScroll from 'better-scroll';

	export default{
		props: {
			deliveryPrice: {
				type:Number,
				default:0
			},
			minPrice: {
				type:Number,
				default:0
			},
			selectFoods: {
				type:Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				fold:true
			}
		},
		computed:{
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total+=food.price*food.count;
				})
				return total;
			},
			totalCount() {
				let count=0;
				this.selectFoods.forEach((food) => {
					count+=food.count;
				});
				return count;
			},
			payDesc() {
				if(this.totalPrice===0){
					return `￥${this.minPrice}元起送`;
				}else if(this.totalPrice<this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`;
				}else{
					return "去结算";
				}
			},
			listShow() {
				if(!this.totalCount){
					this.fold=true;
					return false;
				}
				let show = !this.fold;
				if (show) {
					this.$nextTick(() => {
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.listContent,{
								click:true
							});
						}else{
							this.scroll.refresh();
						}
					})
				}
				return show;
			}
		},
		components:{
			cartcontrol
		},
		methods:{
			toggleList() {
				if(!this.totalCount){
					return 
				}
				this.fold=!this.fold;
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count=0;
				});
			},
			hideList() {
				this.fold=true;
			},
			pay() {
				if(this.totalPrice<this.minPrice){
					return 
				}
				alert(`支付${this.totalPrice}元`);
			}
		}
	}
</script>


<style scoped>
	.list-mask{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index:40;
		background:rgba(0,0,0,0.7);
		backdrop-filter:blur(10px);
	}
	.shopcart{
		position: fixed;
		left:0;
		bottom:0;
		z-index:50;
		width:100%;
		height: 48px;
	}
	.shopcart .content{
		display: flex;
		height: 100%;
		background: #141d27;
	}
	.shopcart .content-left{
		flex:1;
		font-size:0;
	}
	.shopcart .content-left div{
		display: inline-block;
		vertical-align: top;
	}
	.shopcart .content-left .logo-wraper{
		position: relative;
		top:-10px;
		margin:0 12px;
		padding:6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		background: #141d27;
		border-radius:50%;
	}
	.logo-cart{
		display: block;
		width:100%;
		height: 100%;
		background:#2b343c;
		border-radius: 50%;
	}
	.logo-cart.highLight{
		background: rgb(0,160,220);	
	}
	.shopcart .num{
		position: absolute;
		top:0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		border-radius:16px;
		font-weight: 700;
		font-size:9px;
		color:#fff;
		text-align:center;
		background: rgb(240,20,20);
		box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
	}
	.shopcart .content-left .price{
		margin-top:12px;
		line-height: 24px;
		padding-right:12px;
		box-sizing: border-box;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size:16px;
		font-weight: 700;
		color:rgba(255,255,255,0.4);
	}
	.shopcart .content-left .price.highLight{
		color:#fff;
	}
	.shopcart .content-left .desc{
		margin:12px 0 0 12px;
		line-height: 24px;
		font-size: 10px;
		color:rgba(255,255,255,0.4);
	}
	.shopcart .content-right{
		flex:0 0 105px;
		width: 105px;
	}
	.shopcart .pay{
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 12px;
		color:rgba(255,255,255,0.4);
		font-weight:700;
		background: #2b333b;
	}
	.shopcart .pay.highLight{
		background: #00b43c;
		color:#fff;
	}

	.shopcart-list{
		position: absolute;
		top:0;
		left:0;
		z-index:-1;
		width: 100%;
	}
	.shopcart-list .list-header{
		height: 40px;
		line-height: 40px;
		padding:0 18px;
		background: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.shopcart-list .title{
		float:left;
		font-size:14px;
		color:rgb(7,17,27);
	}
	.shopcart-list .empty{
		float:right;
		font-size:12px;
		color:rgb(0,160,220);
	}
	.shopcart-list .list-content{
		padding:0 18px;
		max-height: 217px;
		overflow: hidden;
		background: #fff;
	}
	.shopcart-list .food{
		position: relative;
		padding:12px 0;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7,17,27,.1);
	}
	.shopcart-list .food .name{
		line-height: 24px;
		font-size:14px;
		color:rgb(7,17,27);
	}
	.shopcart-list .food .price{
		position: absolute;
		right: 90px;
		bottom: 12px;
		line-height:18px;
		font-size: 14px;
		font-weight: 700;
		color:rgb(240,20,20);

	}
	.shopcart-list .food .cartcontrol-wrapper{
		position: absolute;
		right: 0;
		bottom:6px;
	}

	.shopcart-list{
		animation:slideInUp 0.5s both;
	}
	.list-mask{
		animation:fadeIn 0.5s both;
	}

	@keyframes slideInUp{
		0%{
			transform:translate3d(0,0,0);
		}
		100%{
			transform:translate3d(0,-100%,0);
		}
	}
	@keyframes fadeIn{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
</style>
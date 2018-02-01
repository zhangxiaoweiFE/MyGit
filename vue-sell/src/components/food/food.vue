<template>
<div class="food" v-show="showFlag" ref="food">
	<div class="food-wp">
		<div class="food-top">
			<div class="food-img">
				<img :src="food.image">
			</div>
			<a href="#" class="back" @click="hide">&lt;</a>
		</div>
		<div class="food-content">
			<h2 class="title">{{food.name}}</h2>
			<div class="detail">
				<span class="sell-count">月售{{food.sellCount}}份</span>
				<span class="rating">好评率{{food.rating}}</span>
			</div>
			<div class="price">
				<span class="now">￥{{food.price}}</span>
				<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
			</div>

			<div class="cartcontrol-wrapper">
				<cartcontrol :food="food"></cartcontrol>
			</div>
			<div class="buy" @click="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
		</div>
		<split v-show="food.info"></split>
		<div class="info"  v-show="food.info">
			<h3 class="title">商品信息</h3>
			<p class="text">{{food.info}}</p>
		</div>
		<split></split>
		<div class="rating">
			<h3 class="title">商品评价</h3>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul v-show="food.ratings && food.ratings.length">
					<li v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
						<div class="user">
							<span class="name">{{rating.username}}</span>
							<img :src="rating.avatar" class="avatar" width="12" height="12">
						</div>
						<div class="time">{{rating.rateTime | formatDate}}</div>
						<p class="text">{{rating.text}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import Vue from "vue";
	import {formatDate} from "@/common/js/date.js";

	import cartcontrol from "@/components/cartcontrol/cartcontrol";
	import split from "@/components/split/split";
	import ratingselect from "@/components/ratingselect/ratingselect";

	const POSITIVE=0;
	const NEGATIVE=1;
	const ALL =2;

	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				showFlag:false,
				selectType:ALL,
				onlyContent:true,
				desc:{
					all: "全部",
					positive: "推荐",
					negative: "吐槽"
				}
			}
		},
		methods:{
			show() {
				this.showFlag=true;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.food,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide() {
				this.showFlag=false;
			},
			addFirst(event) {
				if(!event._constructed){
					return;
				}
				Vue.set(this.food,"count",1);
			},
			needShow(type,text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			}
		},
		events:{
			"ratingtype.select"(type){
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			"content.toggle"(onlyContent){
				this.onlyContent = onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
		filters:{
			formatDate(time){
				let date=new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		}
	}
</script>

<style scoped>
	.food{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom:48px;
		background:#fff;
		animation:slideInRight 0.3s both;
	}
	.food-wp{
		padding-bottom: 48px;
	}
	.food-img{
		position: relative;
		width: 100%;
		height: 0;
		padding-top:100%;
	}
	.food-img img{
		position: absolute;
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.back{
		position: absolute;
		top:10px;
		left: 0;
		padding:10px;
		color: #fff;
		font-size: 20px;
	}

	.food-content{
		position: relative;
		padding:18px;
	}
	.food-content .title{
		margin-bottom: 8px;
		line-height: 14px;
		font-size:14px;
		font-weight:700;
		color:rgb(7,17,27);
	}
	.food-content .detail{
		margin-bottom: 18px;
		line-height: 10px;
		font-size: 0;
	}
	.food-content .detail span{
		font-size: 10px;
		color:rgb(147,153,159);
	}
	.food-content .detail .sell-count{
		margin-right: 12px;
	}
	.food-content .price{
		line-height: 24px;
		font-weight: 700;
	}
	.food-content .price .now{
		margin-right: 8px;
		font-size: 14px;
		color:rgb(240,20,20);
	}
	.food-content .price .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	}

	.cartcontrol-wrapper{
		position: absolute;
		right: 12px;
		bottom:12px;
	}
	.buy{
		position: absolute;
		right: 18px;
		bottom:18px;
		z-index:10;
		padding:0 12px;
		height: 24px;
		line-height: 24px;
		box-sizing:border-box;
		border-radius: 12px;
		font-size: 10px;
		color:#fff;
		background:rgb(0,160,220);
	}

	.info{
		padding:18px;
	}
	.info .title{
		margin-bottom: 6px;
		line-height: 14px;
		font-size: 14px;
		color:rgb(7,17,27);
	}
	.info .text{
		line-height: 24px;
		padding:0 8px;
		font-size:12px;
		color:rgb(77,85,93);
	}

	.rating{
		padding-top:18px;
	}
	.rating .title{
		line-height: 18px;
		margin-left: 18px;
		font-size: 14px;
		color:rgb(7,17,27);
	}

	.rating-wrapper{
		padding:0 18px;
	}
	.rating-item{
		position: relative;
		padding:16px 0;
		border-bottom:1px solid rgba(7,17,27,0.1);
		color:rgb(7,17,27);
	}
	.rating-item .user{
		position: absolute;
		top:16px;
		right: 0;
		line-height: 12px;
		font-size:0;
	}
	.rating-item .name{
		display: inline-block;
		vertical-align: top;
		margin-right: 6px;
		font-size:10px;
	}
	.rating-item .avatar{
		display: inline-block;
		vertical-align: top;
		border-radius:50%;
	}

	.rating-item .time{
		margin-bottom: 5px;
		font-size: 10px;
	}
	.rating-item .text{
		font-size:12px;
		line-height:16px;
	}

	@keyframes slideInRight{
		0%{
			transform:translate3d(100%,0,0);
		}
		100%{
			transform:translate3d(0,0,0);
		}
	}
</style>	

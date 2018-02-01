<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h3 class="title">{{seller.name}}</h3>
				<div class="desc">
					<Star :size="36" :score="seller.score"></Star>
					<span class="text">{{seller.ratingCount}}</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li>
						<h4>起送价</h4>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li>
						<h4>商家配送</h4>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li>
						<h4>平均配送时间</h4>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite($event)">
					<span class="icon-favorite" :class="{'active':favorite}">♥</span>
					<span class="text">{{this.favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h3 class="title">公告与活动</h3>
				<div class="content-wrapper">
					<p>{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h3 class="title">商家实景</h3>
				<div class="pic-wrapper">
					<ul class="pic-list">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h3 class="title">商家信息</h3>
				<div class="info-wrapper">
					<ul>
						<li class="info-item" v-for="info in seller.infos">{{info}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import BScroll from 'better-scroll';
	import {saveToLocal} from "@/common/js/store.js";
	import {getFromLocal} from "@/common/js/store.js";

	import Star from "../star/star";
	import split from "@/components/split/split";

	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				// favorite:false
				favorite:(() => {
					return getFromLocal(this.seller.id , "favorite" , false);
				})
			}
		},
		computed: {
			favoriteText(){
				return this.favorite ? "已收藏" : "收藏"; 
			}
		},
		created() {
			this.classMap = ["decrease","discount","special","invoice","guarantee"];
		},
		watch:{
			seller:function(seller){
				this._initScroll();
			}
		},
		mounted() {
			this._initScroll();

		},
		methods: {
			_initScroll() {
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.seller,{
						click:true
					});
				}else{
					this.scroll.refresh();
				}
			},
			toggleFavorite(event){
				if(!event._constructed){
					return;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id , "favorite" , this.favorite);
			}
		},
		components:{
			Star,
			split
		}
	}
</script>


<style>
	.seller{
		position:absolute;
		top:174px;
		left: 0;
		bottom:0;
		width:100%;
		overflow: hidden;
		color:rgb(7,17,27);
	}
	.seller .overview{
		padding:18px;
	}
	.seller .title{
		margin-bottom: 8px;
		line-height: 14px;
		font-size:14px;
	}
	.seller .desc{
		padding-bottom: 18px;
		font-size:0;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.seller-content .star{
		display: inline-block;
		vertical-align: top;
		margin-right: 8px;
	}
	.seller-content .text{
		display:inline-block;
		vertical-align: top;
		margin-right: 12px;
		line-height: 18px;
		font-size:10px;
		color:rgb(77,85,93);
	}
	.seller-content .remark{
		display: flex;
		padding-top: 18px;
	}
	.seller-content .remark li{
		flex:1;
		text-align:center;
	}
	.seller-content .remark li:not(:last-of-type){
		border-right:1px solid rgba(7,17,27,0.1);
	}
	.seller-content .remark h4{
		margin-bottom: 4px;
		line-height: 10px;
		font-size:10px;
		color:rgb(147,153,159);
	}
	.seller-content .remark .content{
		font-size:10px;
	}
	.seller-content .remark .stress{
		font-size: 24px;
	}
	.seller-content .bulletin{
		padding:18px 18px 0;
	}
	.seller-content .bulletin .content-wrapper{
		padding:0 12px 16px;
		border-bottom:1px solid rgba(7,17,27,0.1);
		line-height: 24px;
		font-size:12px;
		color:rgb(240,20,20);
		text-align:justify;
	}

	.seller-content .support-item{
		padding:16px 12px;
		font-size: 0;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.seller-content .support-item:last-child{
		border:none;
	}
	.seller .supports .icon{
		display: inline-block;
		vertical-align: top;
		width: 16px;
		height: 16px;
		margin-right:6px;
		background-size:16px 16px;
	}
	.seller .supports .icon.decrease{
		background-image: url(decrease_2@2x.png);
	}
	.seller .supports .icon.discount{
		background-image: url(discount_2@2x.png);
	}
	.seller .supports .icon.guarantee{
		background-image: url(guarantee_2@2x.png);
	}
	.seller .supports .icon.invoice{
		background-image: url(invoice_2@2x.png);
	}
	.seller .supports .icon.special{
		background-image: url(special_2@2x.png);
	}
	.seller .supports .text{
		vertical-align: top;
		line-height: 16px;
		font-size: 12px;
	}

	.seller .pics{
		padding:18px;
	}
	.seller .pic-wrapper{
		width:100%;
		overflow-y:hidden;
		overflow-x:auto;
	}
	.seller .pic-list{
		white-space: nowrap;
		font-size:0;
	}
	.seller .pic-item{
		display: inline-block;
		vertical-align: top;
		margin-right: 6px;
		width: 120px;
		height:90px;
	}
	.seller .pic-item:last-child{
		margin-right: 0;
	}

	.seller .info{
		padding:18px 18px 0;
	}
	.seller .info .title{
		padding-bottom: 8px;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.seller .info-item{
		padding:16px 12px;
		line-height:16px;
		font-size:12px;
	}
	.seller .info-item:not(:last-of-type){
		border-bottom:1px solid rgba(7,17,27,0.1);
	}

	.seller .favorite{
		position:absolute;
		top:14px;
		right: 18px;
		width:50px;
		text-align:center;
	}
	.seller .icon-favorite{
		display: block;
		line-height: 24px;
		font-size:24px;
		color:#d4d6d9;
	}
	.seller .icon-favorite.active{
		color:rgb(240,20,20);
	}
	.seller .favorite .text{
		display: block;
		margin-right: 0;
		line-height:18px;
		font-size: 10px;
		color:rgb(77,85,93);
	}
</style>
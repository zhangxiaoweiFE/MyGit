<template> 
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h3 class="score">{{seller.score}}</h3>
					<p class="title">综合评分</p>
					<p class="rank">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<Star :size="36" :score="seller.serviceScore"></Star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<Star :size="36" :score="seller.foodScore"></Star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="ratings.text" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h3 class="name">{{rating.username}}</h3>
							<div class="star-wrapper">
								<Star :size="24" :score="rating.score"></Star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length ">
								<span class="icon-recommend">推荐</span>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>


<script>
	import BScroll from 'better-scroll';
	import {formatDate} from "@/common/js/date.js";

	import Star from "../star/star";
	import split from "@/components/split/split";
	import ratingselect from "@/components/ratingselect/ratingselect";

	const POSITIVE=0;
	const NEGATIVE=1;
	const ALL =2;
	const ERR_OK=0;

	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				showFlag:false,
				selectType:ALL,
				onlyContent:true,
				ratings:[]
			}
		},
		created(){
			this.$http.get("./api/ratings").then((res) => {
				res=res.body;
				if(res.errno===ERR_OK){
					this.ratings =res.data;
					this.$nextTick(() => {
						if(!this.scroll){
							this.scroll=new BScroll(this.$refs.ratings,{
								click:true
							});
						}else{
							this.scroll.refresh();
						}
					})
				}
			})
		},
		methods:{
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
			Star,
			split,
			ratingselect
		}
	}
</script>


<style scoped>
	.ratings{
		position:absolute;
		top:174px;
		left: 0;
		bottom:0;
		width: 100%;
		overflow: hidden;
	}
	.ratings .overview{
		display: flex;
		padding:18px 0;
	}
	.overview-left{
		flex:0 0 137px;
		width: 137px;
		padding:6px 0;
		border-right:1px solid rgba(7,17,27,0.1);
		text-align:center;
	}
	.overview-right{
		flex:1;
		padding:6px 0 6px 24px;
	}

	.overview-left .score{
		margin-bottom: 6px;
		line-height: 28px;
		font-size:24px;
		color:rgb(255,153,0);
	}
	.overview-left .title{
		margin-bottom: 8px;
		line-height: 12px;
		font-size:12px;
		color:rgb(7,17,27);
	}
	.overview-left .rank{
		line-height:10px;
		font-size:10px;
		color:rgb(147,153,159);
	}

	.score-wrapper{
		margin-bottom: 8px;
		line-height: 18px;
		font-size:0;
	}
	.score-wrapper .title,.delivery-wrapper .title{
		display: inline-block;
		vertical-align: top;
		font-size:12px;
		color:rgb(7,17,27);
	}
	.score-wrapper .star{
		display: inline-block;
		vertical-align: top;
		margin:0 12px;
	}
	.score-wrapper .score{
		display: inline-block;
		vertical-align: top;
		font-size:12px;
		color:rgb(255,153,0);
	}
	.delivery-wrapper{
		font-size:0;
	}
	.delivery-wrapper .delivery{
		margin-left: 12px;
		font-size:12px;
		color:rgb(147,153,159);
	}

	.rating-wrapper{
		padding:0 18px;
	}
	.rating-item{
		display: flex;
		padding:18px 0;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.rating-item .avatar{
		flex:0 0 28px;
		width: 28px;
		margin-right:12px; 
	}
	.rating-item .avatar img{
		border-radius:50%;
	}
	.rating-item .content{
		position: relative;
		flex:1;
	}
	.rating-item .content .name{
		margin-bottom: 4px;
		line-height: 12px;
		font-size:10px;
		color:rgb(7,17,27);
	}
	.rating-item .content .star-wrapper{
		margin-bottom: 6px;
		font-size:0;
	}
	.rating-item .content .star{
		display: inline-block;
		vertical-align: top;
		margin-right:6px;
	}
	.rating-item .content .delivery{
		display: inline-block;
		vertical-align: top;
		line-height: 12px;
		font-size:10px;
		color:rgb(147,153,159);
	}
	.rating-item .content .text{
		margin-bottom: 8px;
		line-height: 18px;
		font-size: 12px;
		color:rgb(7,17,27);
	}
	.rating-item .content .recommend{
		font-size:12px;
		line-height: 16px;
	}
	.rating-item .content .recommend span{
		display: inline-block;
		vertical-align: top;
		margin:0 6px 6px 0;
	}
	.rating-item .content .icon-recommend{
		padding:0 2px;
		background: red;
		border-radius: 2px;
		color:#fff;
	}
	.rating-item .content .recommend .item{
		padding:0 6px;
		border:1px solid rgba(7,17,27,0.1);
		border-radius: 2px;
		color:rgb(147,153,159);
		background: #fff;
	}
	.rating-item .content .time{
		position: absolute;
		top:0;
		right: 0;
		font-size: 10px;
		line-height: 12px;
	}

</style>
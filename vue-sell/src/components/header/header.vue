<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>	
				<div v-if="seller.supports" class="support" >
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail()">
				<span class="count">{{seller.supports.length}}个 ＞</span>
				<!-- <i class="icon-keyboard_arrow_right"></i> -->
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail()">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<!-- <i class="icon-keyboard_arrow_right"></i> -->
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>

		<!-- 浮层 -->
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<Star :size="48" :score="seller.score"></Star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>

						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hideDetail">
					<!-- <i class="icon-close"></i> -->
					<a href="javasctipt:;" class="close">×</a>
				</div>
			</div>
		</transition>
	</div>
</template>


<script>
import Star from "../star/star"

	export default{
		props: {
			seller: {
				type:Object
			}
		},
		data() {
			return {
				detailShow:false,
			}
		},
		methods:{
			showDetail() {
				this.detailShow = true
			},
			hideDetail() {
				this.detailShow = false
			}		
		},
		created() {
			this.classMap = ["decrease","discount","special","invoice","guarantee"]
		},
		components:{
			Star
		}
	}
</script>


<style scoped>
	.header{
		color:#fff;
		background:rgba(7,17,25,0.5);
		position: relative;
		overflow: hidden;
	}
	.content-wrapper{
		padding:24px 12px 18px 24px;
		font-size: 0;
		position: relative;
	}
	.content-wrapper .avatar,.content-wrapper .content{
		display: inline-block;
		vertical-align: top;
		font-size: 14px;
	}
	.content-wrapper .content{
		margin-left: 16px;
	}
	.content-wrapper .avatar img{
		border-radius: 2px;
	}

	.content .title{
		margin:2px 0 8px;
	}
	.content .brand{
		display: inline-block;
		vertical-align: top;
		width: 30px;
		height: 18px;
		background-image: url(./brand@2x.png);
		background-size:100%;
	}

	@media (min-device-pixel-ratio:3){
		.content .brand{
			background-image: url(./brand@2x.png);
			background-size:100%;
		}
	}

	.content .name{
		margin-left: 6px;
		font-size: 16px;
		line-height: 18px;
		font-weight: bold;
	}

	.content .description{
		margin-bottom: 10px;
		font-size: 12px;
		line-height: 12px;
	}

	.support .icon{
		display: inline-block;
		vertical-align: top;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size:12px;
	}
	.support .icon.decrease{
		background-image: url(decrease_1@2x.png);
	}
	.support .icon.discount{
		background-image: url(discount_1@2x.png);
	}
	.support .icon.guarantee{
		background-image: url(guarantee_1@2x.png);
	}
	.support .icon.invoice{
		background-image: url(invoice_1@2x.png);
	}
	.support .icon.special{
		background-image: url(special_1@2x.png);
	}
	.support .text{
		vertical-align: top;
		line-height: 12px;
		font-size: 12px;
	}

	.support-count{
		position: absolute;
		right: 12px;
		bottom:18px;
		padding:0 8px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background:rgba(0,0,0,0.2);
		text-align: center;
	}
	.support-count .count,.support-count .icon-keyboard_arrow_right{
		font-size: 10px;
	}

	.bulletin-wrapper{
		height: 28px;
		line-height: 28px;
		padding:0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		background:rgba(7,17,27,0.2);
	}
	.bulletin-title{
		display: inline-block;
		vertical-align: top;
		margin-top: 8px;
		width: 22px;
		height: 12px;
		background-image: url(bulletin@2x.png);
		background-size:22px 12px;
		background-repeat: no-repeat;
	}
	.bulletin-text{
		display: inline-block;
		vertical-align: top;
		margin:0 4px;
		font-size: 10px;
	}
	.bulletin-wrapper .icon-keyboard_arrow_right{
		position: absolute;
		right: 12px;
		top:10px;
		font-size: 10px;
	}

	.background{
		position:absolute;
		top:0;
		left: 0;
		width: 100%;
		z-index:-1;
		filter:blur(10px);
	}

	.detail{
		position: fixed;
		top:0;
		left:0;
		z-index:100;
		width: 100%;
		height: 100%;
		background:rgba(7,17,27,0.8);
		overflow: auto;
		transition:all 0.5s;
		backdrop-filter:blur(10px);
	}

	.fade-enter-active, .fade-leave-active{
		opacity: 1;
		background:rgba(7,17,27,0.8);
	}
	.fade-enter, .fade-leave-to{
		opacity:0;
		background:rgba(7,17,27,0);
	}
	.detail-wrapper{
		width:100%;
		min-height: 100%;
	}
	.detail-main{
		margin-top: 64px;
		padding-bottom:64px;
	}
	.detail-close{
		width: 32px;
		height: 32px;
		margin:-64px auto auto;
		clear:both;
	}
	.detail-close a{
		color:#fff;
		font-size: 30px;
	}
	.detail-wrapper .name{
		line-height: 16px;
		font-size: 16px;
		text-align: center;
		font-weight: 700;
	}

	.detail-main .title{
		display: flex;
		width: 80%;
		margin:28px auto 24px;
	}
	.detail-main .title .line{
		flex:1;
		position: relative;
		top:-6px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.detail-main .title .text{
		padding:0 12px;
		font-size: 14px;
		font-weight: 700;
	}

	.detail-main .supports,.detail-main .bulletin{
		width: 80%;
		margin:0 auto;
	}
	.detail-main .support-item{
		padding:0 12px;
		margin-bottom: 12px;
		font-size: 0;
	}
	.detail-main .support-item:last-child{
		margin-bottom: 0;
	}
	.detail-main .support-item span{
		display: inline-block;
		vertical-align: top;
	}
	.detail-main .support-item .icon{
		width: 16px;
		height: 16px;
		margin-right: 6px;
		background-size:16px 16px;
		background-repeat: no-repeat;
	}


	.detail-main .support-item .icon{
		display: inline-block;
		vertical-align: top;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size:12px;
	}
	.detail-main .support-item .icon.decrease{
		background-image: url(decrease_2@2x.png);
	}
	.detail-main .support-item .icon.discount{
		background-image: url(discount_2@2x.png);
	}
	.detail-main .support-item .icon.guarantee{
		background-image: url(guarantee_2@2x.png);
	}
	.detail-main .support-item .icon.invoice{
		background-image: url(invoice_2@2x.png);
	}
	.detail-main .support-item .icon.special{
		background-image: url(special_2@2x.png);
	}

	.detail-main .support-item .text{
		font-size: 12px;
	}

	.detail-main .bulletin .content{
		padding:0 12px;
		line-height: 24px;
		font-size:12px;
		text-align: justify;
	}
	
	.star-wrapper{
		margin-top: 18px;
		padding:2px 0;
		text-align: center;
	}

</style>
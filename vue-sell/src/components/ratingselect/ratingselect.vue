<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="positive" :class="{'active':selectType===2}">{{desc.all}} <em class="count">{{ratings.length}}</em> </span>
			<span @click="select(0,$event)" class="positive" :class="{'active':selectType===0}">{{desc.positive}} <em class="count">{{positives.length}}</em> 
			</span>
			<span @click="select(1,$event)" class="negative" :class="{'active':selectType===1}">{{desc.negative}} <em class="count">{{negatives.length}}</em> 
			</span>
		</div>
		<div @click="toggleContent($event)" class="switch" :class="{'on':onlyContent===true}">
			<span class="icon-check">✔</span>
			<span>只看有内容的评价</span>
		</div>
		<div class="no-rating">暂无评价</div>
	</div>
</template>

<script>
	import Vue from "vue"; 
	const POSITIVE=0;
	const NEGATIVE=1;
	const ALL =2;

	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all: "全部",
						positive: "满意",
						negative: "不满意"
					}
				}
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating) => {
					return  rating.rateType === POSITIVE;
				});
			},
			negatives(){
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				});
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return;
				}
				this.selectType=type;
				this.$emit("ratingtype.select",type);
			},
			toggleContent(event){
				if(!event._constructed){
					return;
				}
				this.onlyContent=!this.onlyContent;
				this.$emit("content.toggle",this.onlyContent);
			}
		}
	}
</script>

<style scoped>
	.rating-type {
		padding:18px 0;
		margin:0 18px;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.rating-type span{
		display: inline-block;
		vertical-align: top;
		padding:8px 12px;
		margin-right: 8px;
		border-radius: 1px;
		color:rgb(77,85,93);
		font-size: 12px;
	}
	.rating-type span.active{
		color:#fff;
	}
	.rating-type .count{
		font-size: 8px;
		margin-left: 2px;
		font-style: normal;
	}
	.rating-type .positive{
		background: rgba(0,160,220,0.2);
	}
	.rating-type .positive.active{
		background: rgb(0,160,220);
	}
	.rating-type .negative{
		background: rgba(77,85,93,0.2);
	}
	.rating-type .negative.active{
		background: rgb(77,85,93);
	}
	.switch{
		padding:12px 18px;
		line-height: 24px;
		border-bottom:1px solid rgba(7,17,27,0.1);
		color:rgb(147,153,159);
	}
	.icon-check{
		display: inline-block;
		vertical-align: top;
		width: 24px;
		height: 24px;
		background: rgba(77,85,93,0.2);
		border-radius: 50%;
		color:#fff;
		text-align: center;
	}
	.switch.on .icon-check{
		background:#00c850;
	}

	.no-rating{
		padding:16px 18px;
		font-size:12px;
		color:rgb(147,159,159);
	}
</style>
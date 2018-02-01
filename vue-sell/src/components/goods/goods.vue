<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item border-1px" :class="{'cur':curIndex===index}" @click="selMenu(index,$event)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h2 class="title">{{item.name}}</h2>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img :src="food.icon" >
							</div>
							<div class="content">
								<h3 class="name">{{food.name}}</h3>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span>￥{{food.price}}</span>
									<span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>


<script>
	import BScroll from 'better-scroll';

	import shopcart from "@/components/cart/cart";
	import cartcontrol from "@/components/cartcontrol/cartcontrol";
	import food from "@/components/food/food";


	const ERR_OK = 0;

	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data() {
			return {
				goods:[],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			}
		},
		computed: {
			curIndex() {
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];

					if( !height2 || (this.scrollY>=height1 && this.scrollY<height2) ){
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods=[];
				this.goods.forEach((goods) => {
					goods.foods.forEach( (food) => {
						if(food.count){
							foods.push(food);
						}
					})
				})
				return foods;
			}

		},
		created() {
			this.classMap = ["decrease","discount","special","invoice","guarantee"];

			this.$http.get("/api/goods").then((res) => {
				res = res.body;
				if(res.errno == ERR_OK){
					this.goods = res.data;
					// 在修改数据之后立即使用这个方法，获取更新后的 DOM。
					this.$nextTick( () => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			}, (res) => {
				//error
			});
		},
		methods: {
			selMenu(index,event) {
				if(!event._constructed){
					return;
				}
				let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook");
				let el=foodList[index];
				this.foodScroll.scrollToElement(el,300);
			},
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});

				this.foodScroll = new BScroll(this.$refs.foodWrapper,{
					probeType:3,
					click:true
				});

				this.foodScroll.on("scroll",(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})

			},
			_calculateHeight() {
				let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook");
				let height=0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item =foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectFood(food,event) {
				if(!event._constructed){
					return;
				}

				this.selectedFood = food;

				this.$refs.food.show();
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		}
	}
</script>


<style scoped>
	.goods{
		display:flex;
		width: 100%;
		position: absolute;
		top:176px;
		bottom:46px;
		overflow: hidden;
	}
	.menu-wrapper{
		flex:0 0 80px;
		width: 80px;
		background:#f3f5f7;
	}
	
	.menu-item{
		display: table;
		width: 56px;
		height: 54px;
		padding:0 12px;
		line-height: 14px;
	}


	.menu-item.cur{
		position: relative;
		margin-top:-1px;
		z-index:10;
		font-weight: 700;
		background:#fff;
	}
	
    .menu-item .icon{
    	display: inline-block;
    	vertical-align: top;
    	width: 12px;
    	height: 12px;
    	margin-right:2px;
    	background-size:12px;
    }
    .menu-item .icon.decrease{
    	background-image: url(decrease_3@2x.png);
    }
    .menu-item .icon.discount{
    	background-image: url(discount_3@2x.png);
    }
    .menu-item .icon.guarantee{
    	background-image: url(guarantee_3@2x.png);
    }
    .menu-item .icon.invoice{
    	background-image: url(invoice_3@2x.png);
    }
    .menu-item .icon.special{
    	background-image: url(special_3@2x.png);
    }

    .menu-item .text{
    	display: table-cell;
    	vertical-align: middle;
    	width: 56px;
    	line-height: 14px;
    	font-size: 12px;
    	position: relative;
    }
	.menu-item .text:after{
        content:"";
        position: absolute;
        left: 0;
        bottom:0;
        width: 100%;
        border-bottom:1px solid rgba(7,17,27,.1);
    }
    .menu-item.cur .text:after{
    	display: none;
    }

    .foods-wrapper{
    	flex:1;
    }
    .foods-wrapper .title{
    	padding-left: 14px;
    	height: 26px;
    	line-height: 26px;
    	border-left:2px solid #d9dde1;
    	font-size:12px;
    	color: rgb(147,153,159);
    	background:#f3f5f7;
    }
    .foods-wrapper .food-item{
    	display: flex;
    	margin:0 18px;
    	padding:18px 0;
    	position: relative;
    }
    .foods-wrapper .food-item:after{
        content:"";
        position: absolute;
        left: 0;
        bottom:0;
        width: 100%;
        border-bottom:1px solid rgba(7,17,27,.1);
    }
/*    .foods-wrapper .food-item:last-child:after{
		display: none;
    }*/
    .foods-wrapper .food-item .icon{
		flex:0 0 57px;
		margin-right: 10px;
    }
    .foods-wrapper .food-item .icon img{
    	width: 57px;
    	height: 57px;
    }
    .foods-wrapper .food-item .content{
    	flex:1;
    }
    .foods-wrapper .food-item .name{
    	margin: 2px 0 8px;
    	height: 14px;
    	line-height: 14px;
    	font-size: 14px;
    	font-weight:normal;
    	color: rgb(7,17,27);

    }
    .foods-wrapper .food-item .desc{
    	margin-bottom: 8px;
    	font-size: 10px;
    	line-height: 12px;
    	color: rgb(147,153,159);

    }
    .foods-wrapper .food-item .extra{
    	line-height: 10px;
    	font-size:10px;
    }
    .foods-wrapper .food-item .extra span:first-child{
    	margin-right:12px;
    }
    .foods-wrapper .food-item .price{
    	line-height: 24px;
    }
    .foods-wrapper .food-item .price span:first-child{
    	margin-right: 8px;
    	font-size: 14px;
    	font-weight: 700;
    	color:rgb(240,20,20);
    }
    .foods-wrapper .food-item .price span:last-child{
    	text-decoration: line-through;
    	font-size: 10px;
    	font-weight: 700;
    	color: rgb(147,153,159);
    }

    .foods-wrapper .cartcontrol-wrapper{
		position: absolute;
		right:0;
		bottom:12px;
    }
</style>
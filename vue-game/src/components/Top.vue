<template>
	<header>
		<div class="total">
			<i class="coin coin56"></i>
			<a href="javascript:;" class="switch cur shake" style="display: none;">
				<i class="coin"></i>
				<i class="coin-exp small"></i>
				<i class="arrows"></i>
			</a>
			<span>{{nums}}万</span>
			<a href="javascript:;" class="btn-add" title="充值" @click="payShow=true"></a>
		</div>
		<a href="javascript:;" class="link-txt" @click="getShow=true">如何获得金币</a>
		<router-link to="/lotto" class="btn-lott">抽奖<i class="icon circle"></i></router-link>
		<a href="javascript:;" class="btn-menu" @click="showDrop" title="菜单">
			<i class="icon icon-menu"></i>
			<i class="icon circle"></i>
		</a>
		<div class="drop-menu"  v-show="dropShow">
			<ul>
				<li><a href="javascript:;">金币明细</a></li>
				<li><router-link to="/">返回首页</router-link></li>
				<li><a href="javascript:;">退出账号</a></li>
			</ul>
		</div>

		<div class="pop-lay" v-show="payShow" @click="payShow=false" >
			<Pay v-show="payShow"></Pay>
		</div>

		<div class="pop-lay" v-show="getShow" @click="getShow=false">
			<Get></Get>
		</div>

	</header>
</template>


<script>
	import Pay from './Pay'
	import Get from './Get'

	export default {
		name: 'Top',
		components:{ Pay, Get },
		data(){
			return {
				nums:"9999.99",
				dropShow:false,
				payShow:false,
				getShow:false
			}
		},
		methods:{
			showDrop(){
				this.dropShow=!this.dropShow;
			}
		}
	}
</script>



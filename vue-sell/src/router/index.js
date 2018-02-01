import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

import "@/common/css/base.css"

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
	routes: [
		{
			path: '/',
			component: goods
		},
	    {
	      path: '/goods',
	      name: 'goods',
	      component: goods
	    },
	    {
	      path: '/ratings',
	      name: 'ratings',
	      component: ratings
	    },
	    {
	      path: '/seller',
	      name: 'seller',
	      component: seller
	    }
	],
  	linkActiveClass:"active"
})

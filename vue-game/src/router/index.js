import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// import App from '../App'
// import Lotto from '../Lotto'

import Index from '../components/Index'
import Lotto from '../components/Lotto'

const routes=[
	{
		path: '/',
		name: 'index',
		component:	Index	
	},
	{
		path: '/lotto',
		name: 'lotto',
		component:Lotto
	}
];

export default new Router({
	routes
})








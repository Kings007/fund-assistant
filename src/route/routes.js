export const routes = [
	{ path: '/', component: () => import(/*webpackChunkName: 'Home' */ '../pages/Home/index.vue') },
	// { path: '/', component: home },
	{
		path: '/about',
		component: () => import(/*webpackChunkName: 'about' */ '../pages/About/index.vue')
	},
	{
		path: '/fund-manager',
		component: () =>
			import(/*webpackChunkName: 'fundManager' */ '../pages/FundManager/index.vue')
	}
];

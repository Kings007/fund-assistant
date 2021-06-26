export const routes = [
	{ path: '/', component: () => import(/*webpackChunkName: 'Home' */ '../pages/Home/index.vue') },
	// { path: '/', component: home },
	{
		path: '/about',
		component: () => import(/*webpackChunkName: 'Home' */ '../pages/About/index.vue')
	}
];

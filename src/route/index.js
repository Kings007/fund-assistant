import * as vueRouter from 'vue-router';
import { routes } from './routes';

export default vueRouter.createRouter({
	history: vueRouter.createWebHistory(),
	routes
});

import { createApp } from 'vue';
import { Tabbar, TabbarItem } from 'vant';

import './utils/rem';
import App from './App.vue';
import router from './route';

const app = createApp(App);
// app.use(Tabbar);
// app.use(TabbarItem);
app.use(router);
app.mount('#app');


import { setViewResolver, getRoutes } from '@/router/routes';

import Vue from 'vue';
import VueRouter from 'vue-router';
import vStore from '@/store';

import views from '@/router/views';

Vue.use(VueRouter);

setViewResolver(dep => {
  if (views[dep]) {
    return views[dep];
  }

  throw new Error(`View: "${dep}" not registe!`);
});
const routes = getRoutes();

// Router
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
});

router.beforeEach((to, from, next) => {
  let where;

  if (to.matched.length === 0) {
    // 未命名路由
    where = { name: 'dashboard.not-found', query: { error: 'Opps 请求的页面不存在!' } };
  } else if (to.meta.auth !== false && !vStore.getters['session/authorized']) {
    // 正常跳转
    where = { name: 'app.auth.login' };
  }

  // 判断是否微编辑页面
  vStore.commit('ifAppEditing', where || to);
  document.title = to.meta.title;

  where ? next(where) : next();
});

export default router;

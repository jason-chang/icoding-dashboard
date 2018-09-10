import { setApp } from '@/core/hub';

import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import vStore from '@/store';
import vRouter from '@/router';
import appView from '@/App';
import components from '@/components';

import 'particles.js';
import '@/style/app.scss';
import '@/assets/font/iconfont.css';

require('cropper');

Vue.use(VueScrollTo);
Vue.use(ElementUI);
Vue.use(components);

require('@/lib');

require('@/core/debug');

require('@/core/request');

require('@/core/error');

require('@/core/events');

require('@/core/filters');

require('@/mixins/global');

Vue.prototype.$lib = window.$lib;

window.vRouter = vRouter;

(async () => {
  await vStore.dispatch('session/preload');

  /* eslint no-new: 0 */
  const vApp = new Vue({
    el: '#app',
    router: vRouter,
    store: vStore,
    render(h) {
      return h(appView);
    },
  });

  setApp(vApp);
})();

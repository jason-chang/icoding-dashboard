import Vue from 'vue';

import * as env from './env';
import * as device from './device';
import * as helpers from './helpers';

Vue.prototype.$lib =
window.$lib = {
  env,
  device,
  helpers,
};

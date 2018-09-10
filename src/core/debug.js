import Vue from 'vue';

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

if ($lib.env.is('prod')) {
  Raven
    .config('https://9370d2c3d5a349e4acc8ddba63159f58@sentry.icoding.so/3')
    .addPlugin(RavenVue, Vue)
    .install();
}

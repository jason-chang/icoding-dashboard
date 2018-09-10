
import com from './DataFilter';

export default {
  mixin: {},
  install(Vue) {
    Vue.component(com.name, com);
    Vue.mixin(this.mixin);
  },
};

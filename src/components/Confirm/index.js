
import Confirm from './Confirm';

export default {
  mixin: {
    methods: {
      appConfirm(options) {
        this.$store.commit('appConfirm/show', options);
      },
    },
  },
  install(Vue) {
    Vue.component(Confirm.name, Confirm);
    Vue.mixin(this.mixin);
  },
};

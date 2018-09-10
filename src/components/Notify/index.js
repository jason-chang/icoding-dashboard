import Notify from './Notify';

export default {
  mixin: {
    methods: {
      appNotify(message, time) {
        this.$store.commit('appNotify/show', {
          message,
          time,
        });
      },
    },
  },
  install(Vue) {
    Vue.component(Notify.name, Notify);
    Vue.mixin(this.mixin);
  },
};

import Alert from './Alert';

export default {
  mixin: {
    methods: {
      appAlert(type, message, delay) {
        this.$store.commit('appAlert/show', {
          type, message, delay,
        });
      },
    },
  },
  install(Vue) {
    Vue.component(Alert.name, Alert);
    Vue.mixin(this.mixin);
  },
};

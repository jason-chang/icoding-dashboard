<template>
  <transition name="app-notify-fade">
    <div class="app-notify-wrap" v-show="show">
      <div class="text"><span>
        <i class="icon iconfont icon-exclamation font-class"></i></span>
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
  .app-notify-wrap {
    position: fixed; bottom: 12vh; left: 0; right: 0; display: flex; align-items: center; justify-content: center; z-index: 99;
    .text {
      padding: 10px 18px 10px 15px; font-size: 28px; color: white;  border-radius: 30px; background: rgba(0, 0, 0, .7);
    }
    &.app-notify-fade-leave-active,
    &.app-notify-fade-enter-active {
      transition: opacity .4s ease;
    }
    &.app-notify-fade-enter,
    &.app-notify-fade-leave-to {
      opacity: 0;
    }
  }
</style>

<script>
  export default {
    name: 'AppNotify',
    data() {
      return {
        message: 'default',
        show: false,
        timer: null,
      };
    },
    created() {
      this.registerModule();
    },
    mounted() {
    },
    methods: {
      touch() {},
      registerModule() {
        if (this.$store) {
          const vthis = this;

          this.$store.registerModule('appNotify', {
            namespaced: true,
            mutations: {
              show(state, payload) {
                vthis.message = payload.message;
                vthis.show = true;

                clearTimeout(vthis.timer);

                vthis.timer = setTimeout(() => {
                  vthis.show = false;
                }, payload.time ? payload.time : 3000);
              },
            },
          });
        }
      },
    },
  };
</script>
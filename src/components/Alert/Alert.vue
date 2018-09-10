<template>
  <div class="alert app-alert-wrap" :class="['alert-' + type]" role="alert" v-if="show">
    <i class="fa fa-info-circle"></i> {{ message }}
    <button type="button" class="close" aria-label="Close" v-if="!delay" @click="show = false">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<style lang="scss">
  @import "~@/style/modules/variables";

  .app-alert-wrap {
    text-align: center; background: white; border: 0; border-radius: 3px; margin-bottom: 5px; padding: 0; line-height: 50px; font-size: 15px;

    &.alert-danger { color: red; }
    &.alert-success { color: blue; }
  }
</style>

<script>
  export default{
    name: 'AppAlert',
    data() {
      return {
        show: false,
        type: '',
        message: null,
        delay: 4000,
        timmer: null,
      };
    },
    created() {
      this.registerModule();
    },
    methods: {
      touch() {},
      registerModule() {
        if (this.$store) {
          const vthis = this;

          this.$store.registerModule('appAlert', {
            namespaced: true,
            mutations: {
              show(state, payload) {
                vthis.message = payload.message;
                vthis.delay = payload.delay;
                vthis.type = payload.type;
                vthis.show = true;
                vthis.setDelay();
              },
            },
          });
        }
      },
      setDelay() {
        clearTimeout(this.timmer);
        if (this.delay) {
          this.timmer = setTimeout(() => {
            this.show = false;
          }, this.delay);
        }
      },
    },
  };
</script>
<template>
  <div class="app-confirm-wrap" @touchmove.prevent v-show="show">
    <form @submit.prevent>
      <div class="box">
        <div class="text">
          <div class="title">{{ title }} </div>
          <div class="desc">
            {{ message }}
            <input :class="{op0: !getInput}" type="text" name="input" id="v-confirm-input" v-model="userInput">
          </div>
        </div>
        <div class="buttons">
          <input type="button" ref="cancelBtn" name="cancel" @click="clickCancel" value="取消"/>
          <input type="button" ref="confirmBtn" name="confirm" @click="clickConfirm" value="确定"/>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  .app-confirm-wrap {
    position: fixed; left: 0; top: 0; bottom: 0; right: 0; background-color: rgba(22,22,22, .3); display: flex; align-items: center; justify-content: center;
    z-index: 99; margin-top: -20px;

    .box {
      width: 450px; background-color: white; border-radius: 6px; overflow: hidden; margin-top: -50px;

      .text {
        font-size: 12px;

        .title {
          padding: 0 20px; line-height: 45px; font-size: 16px; border-bottom: 1px solid #DDDDDD;
        }

        .desc {
          padding: 20px 20px; line-height: 30px; font-size: 16px;
        }

        .desc input { border: 1px solid #CCCCCC; padding: 10px 15px; border-radius: 3px; font-size: 16px; }
        .desc .op0 { width: 1px; height: 1px; opacity: 0; }
      }

      .buttons {
        display: flex; justify-content: center; align-items: center; border-top: 1px solid #DDDDDD;

        input[type=button] {
          width: 50%; font-size: 16px; color: black; border: 0; border-right: 1px solid #DDDDDD; line-height: 45px; border-radius: 0; background: white;

          &:last-child {
            border-right: 0;
          }

          &:hover,
          &:focus {
            background: #404040; color: white;
          }
        }
      }
    }
  }
</style>

<script>
  export default {
    name: 'AppConfirm',
    data() {
      return {
        title: null,
        message: null,
        getInput: false,
        userInput: '',
        userConfirm: null,
        userCancel: null,
        show: false,
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

          this.$store.registerModule('appConfirm', {
            namespaced: true,
            mutations: {
              show(state, payload) {
                vthis.title = payload.title;
                vthis.message = payload.message;
                vthis.getInput = payload.input;
                vthis.userConfirm = payload.confirm;
                vthis.userCancel = payload.cancel;

                vthis.show = true;

                if (vthis.getInput) {
                  this.$refs.cancelBtn.focus();
                } else {
                  this.$refs.confirmBtn.focus();
                }
              },
            },
          });
        }
      },
      clickConfirm() {
        const userInput = this.userInput;
        this.getInput = false;
        this.userInput = '';
        this.show = false;
        if (this.userConfirm) this.userConfirm(userInput);
      },
      clickCancel() {
        this.show = false;
        if (this.userCancel) this.userCancel();
      },
    },
  };
</script>
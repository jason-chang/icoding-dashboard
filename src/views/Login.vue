<template>
  <div class="login-view-wrap">
    <div id="particles-js"></div>

    <el-card class="form-wrap">
      <div slot="header" class="clearfix">
        <h2>用户登陆</h2>
      </div>
      <el-form class="form" ref="form" :model="form" label-width="80px">
        <el-form-item label-width="0px">
          <el-input prefix-icon="iconfont icon-user" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-input prefix-icon="iconfont icon-lock" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button type="primary" @click="onSubmit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss">
  .login-view-wrap {
    width: 100vw; height: 100vh; color: #b61924;

    .background {  }

    #particles-js { /* stylelint-disable-line */
      position: absolute; width: 100%; height: 100%; background-color: #67b673; overflow: hidden;
    }

    .form-wrap {
      position: absolute; left: 70%; top: 50%; transform: translateX(-50%) translateY(-50%); width: 400px; height: 350px; background: white; padding: 0 20px;

      .el-card__header { text-align: center; }

      .el-form-item__content {
        margin: 10px 0;
      }
    }
  }
</style>

<script>
  /* eslint no-undef: 0 */

  export default {
    name: 'LoginView',
    data() {
      return {
        background: null,
        form: {
          username: '',
          password: '',
        },
      };
    },
    computed: {},
    watch: {},
    mounted() {
      this.drawBackground();
    },
    beforeDestroy() {
      this.background.destroypJS();
    },
    methods: {
      drawBackground() {
        this.background = particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: {
              type: 'circle',
              stroke: { width: 0, color: '#000000' },
              polygon: { nb_sides: 5 },
              image: { src: 'img/github.svg', width: 100, height: 100 },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false, speed: 1, opacity_min: 0.1, sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false, speed: 40, size_min: 0.1, sync: false,
              },
            },
            line_linked: {
              enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1,
            },
            move: {
              enable: true,
              speed: 6,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: true, mode: 'push' },
              resize: true,
            },
            modes: {
              grab: { distance: 400, line_linked: { opacity: 1 } },
              bubble: {
                distance: 400, size: 40, duration: 2, opacity: 8, speed: 3,
              },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        });
      },
      onSubmit() {},
    },
    components: {},
  };
</script>
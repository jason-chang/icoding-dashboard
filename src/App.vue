<template>
  <div class="app-wrap">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  /* 基础组件 */
  .hide { display: none; }
  .pull-left { float: left; }
  .pull-right { float: right; }

  /* webkit滚动条 */
  ::-webkit-scrollbar-button { display: none; }
  ::-webkit-scrollbar-track { background: #fff; }
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar { -webkit-appearance: none; }
  ::-webkit-scrollbar-thumb { min-height: 80px; background: #212121; background-clip: padding-box; border: 2px solid #fff; border-radius: 10px; }

  // Placeholder
  input::placeholder,
  textarea::placeholder { }

  /* 表单 */
  .form {}
  .form-horizontal {}
  .form label { padding-left: 20px; width: 100px; height: 40px; float: left; }
  .form .input-group { width: 300px; float: left; }
  .form .input-control { width: 300px; float: left; }
</style>

<script>
  export default {
    name: 'AppView',
    data() {
      return {};
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {},
    components: {},
  };
</script>
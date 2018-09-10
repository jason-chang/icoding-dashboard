<template>
  <div class="container not-found-wrap">
    <h2><i class="iconfont icon-bug"></i> 404</h2>
    <p>{{ $route.query.error }}</p>
  </div>
</template>

<style lang="scss">
  @import "~@/style/modules/variables";

  .not-found-wrap {
    text-align: center; background: white; padding: 50px 0;

    h2 { font-size: 4em; line-height: 100px; color: $color-pink-dark; }
    p { font-size: 20px; line-height: 100px; }
  }
</style>

<script>

  export default {
    name: 'NotFoundView',
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    methods: {},
    components: {},
  };
</script>
import Vue from 'vue';

Vue.mixin({
  computed: {},
  methods: {
    gotoPage(page) {
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: { page },
      });
    },
  },
});

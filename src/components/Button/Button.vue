<template>
  <div class="app-button-wrap">
    <b-btn :id="'app-button-'+ _uid" :variant="variant" :size="size" :type="type" @click.stop="$emit('click')">
      <span v-if="!loading"><slot></slot></span>
      <i v-else class="fa fa-spinner fa-pulse"></i>
    </b-btn>
    <b-popover :show="popShow" :target="'app-button-'+ _uid" triggers="" :placement="pop.placement" :title="pop.title" :content="pop.content">
      <slot name="pop-content"></slot>
    </b-popover>
  </div>
</template>

<style lang="scss">
  .app-button-wrap {
    display: inline-block;
  }
</style>

<script>
  export default {
    name: 'AppButton',
    data() {
      return {};
    },
    props: {
      loading: {
        type: Boolean,
        required: false,
        default: false,
      },
      type: {
        type: String,
        required: false,
        default: 'button',
      },
      variant: {
        type: String,
        required: false,
        default: 'default',
      },
      size: {
        type: String,
        required: false,
        default: 'md',
      },
      customStyle: {
        type: Object,
        required: false,
        default: () => Object.create(null),
      },
      customClass: {
        type: Array,
        required: false,
        default: () => [],
      },
      pop: {
        type: Object,
        required: false,
        default: null,
      },
      popShow: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

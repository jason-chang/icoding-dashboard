<template>
  <el-popover class="app-popover-confirm" placement="top" width="170" v-model="popShow">
    <p style="margin-bottom: 5px; padding: 5px;">{{ message }}</p>
    <div style="text-align: center; margin: 0">
      <el-button size="mini" @click="handleCancel">取消</el-button>
      <el-button :type="type" size="mini" @click="handleConfirm">确定</el-button>
    </div>
    <el-button size="mini" :type="type" slot="reference" @click="popShow = true">{{ label }}</el-button>
  </el-popover>
</template>

<style lang="scss">
  .app-popover-confirm {
  }
</style>

<script>

  export default {
    name: 'AppPopConfirmButton',
    props: {
      type: {
        type: String,
        required: false,
        default: 'primary',
      },
      label: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        popShow: false,
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      handleCancel() {
        this.popShow = false;
        this.$emit('cancel');
      },
      handleConfirm() {
        this.popShow = false;
        this.$emit('confirm');
      },
    },
  };
</script>
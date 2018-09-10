<template>
  <el-header class="header-widget-wrap">
    <router-link class="logo" :to="{name: 'dashboard.overview'}" :style="{width: appMenuCollapse ? '60px' : '225px'}">
      <div class="big" v-if="!appMenuCollapse">
        <span class="green">Icoding</span>
        <span>.so</span>
      </div>
      <div class="small" v-if="appMenuCollapse">
        <span class="green">ICD</span>
      </div>
    </router-link>

    <el-menu mode="horizontal" :default-active="`${appBreadcrumb[0].id}`">
      <el-menu-item v-for="item in session.menuTree" :key="item.id" :index="`${item.id}`" :route="item.route" @click="changeMenu">
        {{ item.display_name }}
      </el-menu-item>
    </el-menu>
    
    <el-menu class="pull-right" mode="horizontal" :default-active="'1'">
      <el-menu-item index="1">消息中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-user"></i>
          JasonChang
        </template>
        <el-menu-item index="2-1">修改密码</el-menu-item>
        <el-menu-item index="2-3">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<style lang="scss">
  @import "~@/style/modules/variables";

  .header-widget-wrap {
    height: 60px; min-height: 0px !important; width: 100%; z-index: 10; padding: 0; justify-content: space-between; border-bottom: 1px solid #e6e6e6; overflow: hidden; position: fixed; background: white; z-index: 100;

    .el-menu { display: inline-block; border-bottom: 0; }
    .pull-right { float: right; }

    .logo {
      float: left; background: white; color: #45B97C; line-height: 60px; font-size: 28px; display: flex; width: 225px; transition: all ease .4s; border-right: 1px solid #e6e6e6;

      span { display: inline-block; float: left; }
      .green { background: #45B97C; color: white; }

      .big {
        span:nth-child(1) { width: 140px; text-align: right; padding-right: 10px; }
        span:nth-child(2) { width: 84px; padding-left: 5px; }
      }
      .small span { width: 60px; text-align: center; }
    }
  }
</style>

<script>
  export default {
    name: 'HeaderWidget',
    data() {
      return {
        showLogin: false,
        categories: [],
      };
    },
    computed: {},
    mounted() {
      // this.loadCategories();
    },
    methods: {
      changeMenu(menuItem) {
        this.$router.push({ name: menuItem.route });
      },
      async logout() {
        await this.$store.dispatch('session/logout');
      },
    },
    components: {},
  };
</script>
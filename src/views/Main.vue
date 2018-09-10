<template>
  <el-container class="main-view-wrap">
    <header-widget></header-widget>

    <el-container>
      <sider-widget></sider-widget>

      <el-main class="main-wrap" :style="{marginLeft: appMenuCollapse?'60px':'225px'}">
        <el-breadcrumb class="main-breadcrumb">
          <el-breadcrumb-item v-for="item in appBreadcrumb" :key="item.id" :to="item.route">{{ item.display_name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="page-tabs-wrap">
          <ul class="tabs">
            <router-link class="item" tag="li" v-for="(item, index) in tabsData" :to="item.route" :class="{active: appActiveMenu.route.name === item.route.name}">
              <a>
                <span class="text">{{ item.display_name }}</span>
                <span class="el-icon-close" @click.prevent.stop="closeTab(item, index)"></span>
              </a>
            </router-link>
          </ul>

          <ul class="controls">
            <li class="item" @click="clearTabs">
              <i class="iconfont icon-trash-o"></i>
            </li>
          </ul>
        </div>

        <div class="main-content">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </el-main>
    </el-container>

    <div class="head-message" v-if="false">
      <div class="container">
        <app-alert></app-alert>
      </div>
    </div>
    <app-notify></app-notify>
    <app-confirm></app-confirm>
  </el-container>
</template>

<style lang="scss">
  .main-view-wrap {
    min-height: 100vh; min-width: 100%; overflow: hidden; flex-direction: column;

    &>.content { overflow: hidden; padding: 0 0 85px; }
    &>.content>.container { overflow: hidden; }

    .head-message { padding: 60px 0 5px; }
    .head-message .alert { text-align: center; background: white; border: 0; border-radius: 3px; margin-bottom: 5px; padding: 0; line-height: 50px; font-size: 15px; }

    .main-wrap { margin-top: 60px; padding: 0; transition: all ease-in .3s; }

    .main-breadcrumb { padding: 20px 20px 5px; line-height: 20px; }

    .page-tabs-wrap {
      border-bottom: 1px solid #e4e7ed; display: flex; flex-direction: row; padding: 10px 20px 0; justify-content: space-between; height: 45px;

      .tabs {
        display: flex; flex-direction: row;

        .item {
          border-style: solid; border-color: #e4e7ed; border-width: 1px 1px 1px 1px; transform: translateY(1px); background: #f6f6f6; border-radius: 5px 5px 0 0; margin-right: 5px; display: block; user-select: none; cursor: pointer;

          a { display: inline-block; padding: 0 10px; line-height: 30px; }

          &:last-child { border-width: 1px 1px 1px 1px; }

          &.active { border-bottom: 1px solid white; color: blue; background: white; }

          .text { margin-right: 5px; }

          .el-icon-close:hover { background: #b9b9b9; color: white; border-radius: 50%; }
        }
      }

      .controls {
        .item { line-height: 28px; width: 30px; height: 30px; text-align: center; color: #7f7f7f; font-size: 14px; border: 1px solid transparent; }
        .item:hover { border: 1px solid #e4e7ed; }
      }
    }

    .main-content { padding: 10px; overflow: auto; }

    .curd-wrap { }

    .editor-card {
      .el-card__header {
        display: flex; flex-direction: row; justify-content: space-between; align-items: center;
      }
      .editor-card-close {
        line-height: 20px; width: 20px; padding: 0;
      }
    }
  }
</style>

<script>
  import { mapState } from 'vuex';
  import clone from 'lodash/clone';

  import HeaderWidget from '@/widgets/Header';
  import SiderWidget from '@/widgets/Sider';

  export default {
    name: 'MainView',
    data() {
      return {
        tabsData: [],
      };
    },
    computed: {
      ...mapState({
        errorMessage: 'errorMessage',
      }),
    },
    watch: {
      errorMessage(val) {
        if (val) {
          this.appNotify(val);
          this.$store.commit('setErrorMessage', '');
        }
      },
      $route() {
        this.calcBreadcrumb();
        this.calcTabs();
      },
    },
    mounted() {
      this.calcBreadcrumb();
      this.calcTabs();
    },
    methods: {
      calcBreadcrumb() {
        if (!this.$route.name) {
          return;
        }

        let routePermission;

        for (const item of this.session.permissions) {
          if (this.$route.name === item.route) {
            routePermission = item;
          }
        }

        let breadcrumb = this.session.permissions.filter(item => routePermission.parents.indexOf(item.id) !== -1);

        breadcrumb = breadcrumb.map(item => {
          const val = {
            id: item.id,
            display_name: item.display_name,
            name: item.name,
            type: item.type,
            route: { name: item.route },
          };
          return val;
        });

        breadcrumb.push({
          id: routePermission.id,
          display_name: routePermission.display_name,
          name: routePermission.name,
          type: routePermission.type,
          route: clone(this.$route),
        });

        this.$store.commit('setBreadcrumb', breadcrumb);
      },
      calcTabs() {
        const activeMenu = this.appActiveMenu;

        let alreadyShow = false;
        for (const item of this.tabsData) {
          if (activeMenu.route.name === item.route.name) {
            alreadyShow = true;
            break;
          }
        }
        if (!alreadyShow) {
          this.tabsData.push(activeMenu);
        }
      },
      closeTab(item, index) {
        if (this.tabsData.length < 2) return;

        if (item.route.name === this.$route.name) {
          let toShow = index > 0 ? index - 1 : index + 1;
          toShow = this.tabsData[toShow].route;
          this.$delete(this.tabsData, index);
          this.$router.push(toShow);
        } else {
          this.$delete(this.tabsData, index);
        }
      },
      clearTabs() {
        this.tabsData = this.tabsData.filter(item => item.route.name === this.$route.name);
      },
    },
    components: {
      HeaderWidget,
      SiderWidget,
    },
  };
</script>
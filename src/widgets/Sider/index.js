
import clone from 'lodash/clone';

import './style.scss';

export default {
  name: 'SiderWeidget',
  data() {
    return {
      activeItem: {
        id: 0,
        parents: [],
      },
      menu: null,
    };
  },
  computed: {
  },
  watch: {
    appBreadcrumb() {},
  },
  render() {
    if (!this.appActiveMenu) {
      return '';
    }

    this.getMenuTree();

    return (
      <el-aside class="sider-widget-wrap" width="auto">
        <div class="toggle-collapse" onClick={ this.handletoggleMenuCollapse }>
          <i class={{ iconfont: true, 'icon-angle-left': !this.appMenuCollapse, 'icon-angle-right': this.appMenuCollapse }}></i>
        </div>
        { this.renderMenu() }
      </el-aside>
    );
  },
  methods: {
    /* =----------------= some data =----------------= */
    getMenuTree() {
      const { permissionsIndexById, menuTree } = this.session;
      const activeMenu = this.appActiveMenu;

      let top;
      let activeItem;
      for (const item of Object.values(permissionsIndexById)) {
        if (activeMenu.route.name !== item.route) continue;

        activeItem = item;

        if (item.parent_id === 0) {
          top = item;
        } else {
          top = permissionsIndexById[item.parents[0]];
        }
      }

      let allItems = [];
      for (let i = 0; i < menuTree.length; i++) {
        if (top.route === menuTree[i].route && menuTree[i].children) {
          allItems = clone(menuTree[i].children);
        }
      }

      return { allItems, activeItem };
    },

    /* =----------------= renders =----------------= */
    renderMenu() {
      const { allItems, activeItem } = this.getMenuTree();

      const activeIndex = activeItem.parents.concat(activeItem.id).join('a');

      return (
        <el-menu
          class={{ 'el-menu-vertical-demo': true }}
          default-active={ activeIndex }
          collapse={ this.appMenuCollapse }>
          { this.renderMenuItems(allItems, 1, []) }
        </el-menu>
      );
    },
    renderMenuItems(data, level) {
      const list = [];

      for (let i = 0; i < data.length; i++) {
        (child => {
          const titleList = [];

          if (child.icon) {
            titleList.push(<i class={{ iconfont: true, [`icon-${child.icon}`]: true }}></i>);
          }

          titleList.push(<span>{ child.display_name }</span>);

          const index = child.parents.concat(child.id).join('a');

          if (!child.children || !child.children.length) {

            // 无子级菜单
            list.push((
              <el-menu-item index={ index } route={{ name: child.route }} onClick={ this.handleChangeRoute }>
                { titleList }
              </el-menu-item>
            ));
            return;
          }

          // 如果有子级别菜单
          let childList = [
            <template slot="title">{ titleList }</template>,
          ];

          const childMenu = this.renderMenuItems(child.children, level + 1);

          childList = childList.concat(childMenu);

          list.push(<el-submenu index={ index }>{ childList }</el-submenu>);
        })(data[i]);
      }

      return list;
    },

    /* =----------------= event handlers =----------------= */
    handleChangeRoute(vm) {
      this.$router.push(vm.route);
    },
    handletoggleMenuCollapse() {
      this.$store.commit('setMenuCollapse', !this.appMenuCollapse);
    },
  },
};

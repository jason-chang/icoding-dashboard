import { mapState, mapGetters } from 'vuex';
import Vue from 'vue';

const stat = {
  state: {
    menuCollapse: false,
    breadcrumb: [{
      id: 1,
      title: '主页',
      type: 1,
      route: {
        path: '/dashboard',
      },
    }],
  },
  modules: {},
  mutations: {
    setBreadcrumb(state, payload) {
      state.breadcrumb = payload;
    },
    setMenuCollapse(state, payload) {
      state.menuCollapse = payload;
    },
    ifAppEditing(store, payload) {
      if (/(edit|create)$/.test(payload.name)) {
        document.documentElement.classList.add('editing');
      } else {
        document.documentElement.classList.remove('editing');
      }
    },
  },
  actions: {
    callLogin() {
    },
  },
  getters: {
    activeMenu(state) {
      let tab;
      const breadcrumb = state.breadcrumb;
      for (let i = breadcrumb.length - 1; i > 0; i--) {
        if (breadcrumb[i].type === 1) {
          tab = breadcrumb[i];
          break;
        }
      }
      return tab;
    },
  },
};

Vue.mixin({
  computed: {
    ...mapState({
      appBreadcrumb: 'breadcrumb',
      appMenuCollapse: 'menuCollapse',
    }),
    ...mapGetters({
      appActiveMenu: 'activeMenu',
    }),
  },
});

export default stat;

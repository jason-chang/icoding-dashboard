import { mapState, mapGetters } from 'vuex';

import Vue from 'vue';
import lf from 'localforage';
import vRouter from '@/router';
import base64url from '@/lib/base64url';
import upperFirst from 'lodash/upperFirst';

function buileMenuTree(permissions) {
  const prebuild = {};
  const tree = [];

  permissions.forEach(item => {
    prebuild[item.id] = item;
  });

  permissions.forEach(item => {
    if (item.type !== 1) return;

    if (item.parent_id === 0) {
      tree.push(item);
    } else {
      const children = prebuild[item.parent_id].children || [];
      children.push(item);
      prebuild[item.parent_id].children = children;
    }

  });

  return tree;
}

function indexById(permissions) {
  const arr = {};
  permissions.forEach(item => {
    arr[item.id] = item;
  });
  return arr;
}

const session = {
  namespaced: true,
  state: {
    jwt: null,
    token_type: 'bearer',
    user: null,
    permissions: '',
    permissionsIndexById: '',
    menuTree: [],
  },
  modules: {},
  mutations: {
    put(state, payload) {
      for (const name in payload) {
        state[name] = payload[name];
      }
    },
    forget(state, payload) {
      payload = [].concat(payload);
      payload.forEach(name => {
        state[name] = null;
      });
    },
  },
  actions: {
    async put({ commit }, payload) {
      const queue = [];
      for (const name in payload) {
        queue.push(lf.setItem(name, payload[name]));
      }
      await Promise.all(queue);

      commit('put', payload);
    },
    async forget({ commit }, payload) {
      payload = [].concat(payload);
      const queue = [];
      for (const name of payload) {
        queue.push(lf.removeItem(name));
      }
      await Promise.all(queue);
      commit('forget', payload);
    },
    async logout(store) {

      const apiUrl = $lib.helpers.route('api.auth.logout');
      await Vue.axios.post(apiUrl, {
        headers: { Authorization: this.state.jwt },
      });

      if (vRouter.currentRoute.meta.auth === true) {
        vRouter.replace({ name: 'app.auth.login' });
      }

      await lf.removeItem('jwt');
      store.dispatch('forget', ['jwt', 'user']);
    },
    async preload(store) {

      await lf.iterate((value, name) => {
        const payload = Object.create(null);
        payload[name] = value;
        store.commit('put', payload);
      });

      if (store.state.jwt) {
        const parts = store.state.jwt.split('.');

        let body = base64url.decode(parts[1], 'utf8');
        body = JSON.parse(body);

        if (parseInt(body.exp, 10) < (new Date()).getTime() / 1000) {
          await store.dispatch('logout');
        }
      }

      // if (store.getters.authorized) {
      //   const apiUrl = $lib.helpers.route('api.auth.info');
      //   const { data: { data: user } } = await Vue.axios.get(apiUrl, {
      //     headers: { Authorization: upperFirst(`${store.state.tokenType} ${store.state.jwt}`) },
      //   });
      //   await store.commit('put', { user });
      // }

      // 如果登陆加载 用户权限

      if (store.getters.authorized) {
        // const apiUrl = $lib.helpers.route('dash_api.util.permissions');
        const { data: { data: permissions } } = await Vue.axios.get('fake/permissions.json', {
          headers: { Authorization: upperFirst(`${store.state.tokenType} ${store.state.jwt}`) },
        });

        await store.commit('put', {
          permissions,
          permissionsIndexById: indexById(permissions),
          menuTree: buileMenuTree(permissions),
        });
      }
    },
  },
  getters: {
    authorized(state) {
      if ($lib.env.is('dev')) {
        return true;
      }

      return !!state.jwt;
    },
  },
};

Vue.mixin({
  computed: {
    ...mapState('session', {
      session: state => state,
    }),
    ...mapGetters('session', {
      authorized: 'authorized',
    }),
  },
});

export default session;

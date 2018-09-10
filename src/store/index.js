import Vue from 'vue';
import Vuex from 'vuex';
import defaultStat from '@/store/modules/default';
import sessionStat from '@/store/modules/session';

Vue.use(Vuex);

defaultStat.modules = {
  session: sessionStat,
};

const store = new Vuex.Store(defaultStat);

export default store;

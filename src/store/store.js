import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import authStore from './modules/authStore'
import flashStore from './modules/flashStore'

export default new Vuex.Store({
   modules: {
      authStore,
      flashStore
   }
});
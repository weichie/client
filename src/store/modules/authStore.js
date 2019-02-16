export const STORE_AUTH_SET_USER_STATE = "STORE_AUTH_SET_USER_STATE"

const state = {
   isLoggedIn: false,
   userData: {}
};

const getters = {
   getUserDoc: state => state.userData.docId
};

const actions = {
   [STORE_AUTH_SET_USER_STATE]: ({commit}, payload) => {
      commit(STORE_AUTH_SET_USER_STATE, payload);
   }
};

const mutations = {
   [STORE_AUTH_SET_USER_STATE]: (state, payload) => {
      state.isLoggedIn = true;
      state.userKey = 1;
      state.userData = payload;
   }
};

export default {
   state,
   getters,
   actions,
   mutations
}
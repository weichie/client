export const STORE_AUTH_SET_USER_STATE = "STORE_AUTH_SET_USER_STATE"
export const STORE_AUTH_RESET_USER = "STORE_AUTH_RESET_USER"

const state = {
   isLoggedIn: false,
   userData: {}
};

const getters = {
   isLoggedIn: state => state.isLoggedIn,
   getUserDoc: state => state.userData.docId
};

const actions = {
   [STORE_AUTH_SET_USER_STATE]: ({commit}, payload) => {
      commit(STORE_AUTH_SET_USER_STATE, payload);
   },
   [STORE_AUTH_RESET_USER]: ({commit}) => {
      commit(STORE_AUTH_RESET_USER);
   }
};

const mutations = {
   [STORE_AUTH_SET_USER_STATE]: (state, payload) => {
      state.isLoggedIn = true;
      state.userData = payload;
   },
   [STORE_AUTH_RESET_USER]: state => {
      state.isLoggedIn = false;
      state.userData = {}
   }
};

export default {
   state,
   getters,
   actions,
   mutations
}
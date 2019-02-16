import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import { routes } from './routes'
import store from './store/store'

import 'bulma/css/bulma.css'

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('dashboard');
  else next();
});

let app = '';

firebase.auth().onAuthStateChanged(user => {
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
});
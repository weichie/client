import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import db from './firestore';

import { routes } from './routes'
import store from './store/store'
import { STORE_AUTH_SET_USER_STATE } from './store/modules/authStore'

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
  if(user){
    let userDoc = {};

    db.collection('users').where("email", "==", user.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const docId = doc.id;
          userDoc = {
            ...doc.data(),
            docId
          }
          store.dispatch(STORE_AUTH_SET_USER_STATE, userDoc);
        });
      })
      .catch(err => {
        console.log("Error getting documents: ", err);
      });
  }
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
});
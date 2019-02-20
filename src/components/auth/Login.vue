<template>
   <div class="container auth-container">
      <h2>Login to your account</h2>
      <p class="error-message" v-show="errorMessage">{{errorMessage}}</p>
      <form @submit.prevent="login()" class="auth-form">
         <div class="input-group large">
            <input type="email" placeholder="email" v-model="email" autocomplete="email" />
         </div>
         <div class="input-group large">
            <input type="password" placeholder="password" v-model="password" autocomplete="current-password" />
         </div>
         <div class="input-group large">
            <button class="btn btn-block btn-primary">Login</button>
         </div>
      </form>
      <small>Not yet an account? <router-link to="/register">Create one here</router-link></small>
   </div>
</template>

<script>
   import firebase from 'firebase';
   import db from "../../firestore";

   import { STORE_AUTH_SET_USER_STATE } from '../../store/modules/authStore';

   export default {
      name: 'Login',
      data(){
         return{
            email: '',
            password: '',
            successMessage: '',
            errorMessage: ''
         }
      },
      methods: {
         login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
               .then(() => {
                  this.$router.replace('dashboard');
               })
               .catch(err => {
                  this.errorMessage = err.message
               });
         }
      }
   }
</script>

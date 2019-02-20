<template>
   <div class="container auth-container">
      <h2>Register a new account!</h2>

      <div class="register-panel">
         <p class="error-message" v-show="this.errorMessage">{{errorMessage}}</p>

         <form @submit.prevent="registerUser" class="auth-form">
            <div class="input-group medium">
               <input class="input" type="text" id="firstname" placeholder="Firstname" v-model="userData.firstname" autocomplete="off" />
            </div>
            <div class="input-group medium">
               <input class="input" type="text" id="lastname" placeholder="Lastname" v-model="userData.lastname" autocomplete="off" />
            </div>
            <div class="input-group large">
               <input class="input" type="text" id="username" placeholder="Username" v-model="userData.username" autocomplete="off" />
            </div>
            <div class="input-group large">
               <input class="input" type="email" id="email" placeholder="Email" v-model="userData.email" autocomplete="off" />
            </div>
            <div class="input-group large">
                <input class="input" type="password" id="password" placeholder="Password" v-model="userData.password" autocomplete="off" />
            </div>
            <div class="input-group large">
               <button class="btn btn-primary">Create account</button>
               <button @click.prevent.stop="reset" class="btn btn-secondary">Cancel</button>
            </div>
         </form>

         <small>Already have an account? <router-link to="/login">Login</router-link></small>
      </div>
   </div>
</template>

<script>
   import firebase from 'firebase'
   import db from '../../firestore'

   export default {
      name: 'Register',
      data(){
         return{
            userData: {
               firstname: '',
               lastname: '',
               username: '',
               email: '',
               password: ''
            },
            successMessage: '',
            errorMessage: ''
         }
      },
      methods: {
         registerUser(){
            firebase.auth().createUserWithEmailAndPassword(this.userData.email, this.userData.password)
               .then(() => {
                  firebase.auth().currentUser.updateProfile({
                     displayName: this.userData.username
                  }).then(() => {
                     db.collection('users').add({
                        firstname: this.userData.firstname,
                        lastname: this.userData.lastname,
                        username: this.userData.username,
                        email: this.userData.email,
                        isAdmin: false,
                        active: 1
                     }).then(() => {
                        this.$router.replace('home');
                     }).catch(err => {
                        this.errorMessage = err.message;
                     });
                  }).catch(err => {
                     this.errorMessage = err.message;
                  });
               }).catch(err => {
                  this.errorMessage = err.message
               });
         },
         reset(){
            this.userData = {
               firstname: '',
               lastname: '',
               username: '',
               email: '',
               password: ''
            },
            this.successMessage = '',
            this.errorMessage = ''
         }
      }
   }
</script>

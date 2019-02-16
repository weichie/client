<template>
   <section class="section">
      <div class="container">
         <h1 class="title">Registrate your account!</h1>
         
         <form @submit.prevent="registerUser">
            <div class="field">
               <label class="label" for="firstname">Firstname</label>
               <div class="control">
                  <input class="input" type="text" id="firstname" placeholder="Firstname" v-model="userData.firstname">
               </div>
            </div>

            <div class="field">
               <label class="label" for="lastname">Lastname</label>
               <div class="control">
                  <input class="input" type="text" id="lastname" placeholder="Lastname" v-model="userData.lastname">
               </div>
            </div>

            <div class="field">
               <label class="label" for="username">Username</label>
               <div class="control">
                  <input class="input" type="text" id="username" placeholder="Username" v-model="userData.username">
               </div>
            </div>

            <div class="field">
               <label class="label" for="email">Email</label>
               <div class="control">
                  <input class="input" type="email" id="email" placeholder="Email" v-model="userData.email">
               </div>
            </div>

            <div class="field">
               <label class="label" for="password">Password</label>
               <div class="control">
                  <input class="input" type="password" id="password" placeholder="Password" v-model="userData.password">
               </div>
            </div>

            <p v-show="errorMessage" class="has-text-danger">{{errorMessage}}</p>

            <div class="field is-grouped">
               <div class="control">
                  <button class="button is-secondary">Create account</button>
               </div>
               <div class="control">
                  <button @click.prevent.stop="reset" class="button is-text">Cancel</button>
               </div>
            </div>
         </form>
      </div><!-- ./container -->
   </section>
</template>

<script>
   import firebase from 'firebase'
   import db from '../firestore'

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

<template>
   <div class="wrapper">
      <h1>Register component</h1>

      <form @submit.prevent="registerUser">
         <input type="text" placeholder="Firstname" v-model="userData.firstname" /><br>
         <input type="text" placeholder="Lastname" v-model="userData.lastname" /><br>
         <input type="text" placeholder="Username" v-model="userData.username" /><br>
         <input type="email" placeholder="Email" v-model="userData.email" /><br>
         <input type="password" placeholder="Choose a password" v-model="userData.password" /><br>
         <button>Create account</button>
      </form>
      {{errorMessage}}
   </div>
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
         }
      }
   }
</script>

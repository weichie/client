<template>
   <div class="wrapper">
         <h1>Login Component</h1>
         <form @submit.prevent="login">
            <input type="email" placeholder="Email" v-model="email" /><br>
            <input type="password" placeholder="Password" v-model="password" /><br>
            <button>Login</button>
         </form>
   </div>
</template>

<script>
   import firebase from 'firebase';
   import db from "../firestore";

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
               .then(user => {
                  console.log(user);
               })
               .catch(err => {
                  this.errorMessage = err.message
               });
         }
      }
   }
</script>

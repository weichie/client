<template>
   <section class="section">
      <div class="container">
         <h1 class="title">Login to your account</h1>

         <p v-show="errorMessage" class="has-text-danger">{{errorMessage}}</p>

         <form @submit.prevent="login">
            <div class="field">
               <label for="email" class="label">Email</label>
               <div class="control">
                  <input class="input" type="email" id="email" placeholder="Email" v-model="email" />
               </div>
            </div>

            <div class="field">
               <label for="password">Password</label>
               <div class="control">
                  <input class="input" type="password" id="password" placeholder="Password" v-model="password" />
               </div>
            </div>

            <div class="field is-grouped">
               <div class="control">
                  <button class="button is-primary">Login</button>
               </div>
            </div>
            <p>
               Don't have an account yet? 
               <router-link to="/register">Create one here</router-link>
            </p>
         </form>
      </div>
   </section>
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
               .then(user => {
                  const userEmail = user.user.email;
                  let userDoc = {};

                  db.collection('users').where("email", "==", userEmail)
                     .get()
                     .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                           const docId = doc.id;
                           userDoc = {
                              ...doc.data(),
                              docId
                           }
                           this.$store.dispatch(STORE_AUTH_SET_USER_STATE, userDoc).then(() => {
                              this.$router.replace('dashboard');
                           });
                        });
                     })
                     .catch(err => {
                        console.log("Error getting documents: ", err);
                     });
               })
               .catch(err => {
                  this.errorMessage = err.message
               });
         }
      }
   }
</script>

<template>
   <header>
      <router-link to="/" class="logo">Budgett</router-link>
      <h1>{{currentRoute}}</h1>
      <nav class="main-nav">
         <router-link v-if="!isLoggedIn" to="/login" class="button is-primary">Log in</router-link>
         <router-link v-if="!isLoggedIn" to="/register" class="button is-light">Sign up</router-link>
         <router-link v-if="isLoggedIn" to="/account" class="button is-light">{{ $store.state.authStore.userData.username }}</router-link>
         <a href="#!" v-if="isLoggedIn" @click.prevent.stop="logout" class="button is-primary">Logout</a>
      </nav>
   </header>   
</template>

<script>
   import firebase from 'firebase'
   import { STORE_AUTH_RESET_USER } from '../../store/modules/authStore'

   export default {
      name: "Header-component",
      data(){
         return{
             
         }
      },
      methods: {
         logout(){
            firebase.auth().signOut().then(() => {
               this.$store.dispatch(STORE_AUTH_RESET_USER);
               this.$router.replace('login');
            });
         }
      },
      computed: {
         isLoggedIn(){
            return this.$store.getters.isLoggedIn
         },
         currentRoute(){
            return (this.$route.name !== 'login') ? this.$route.name : null;
         }
      }
   }
</script>


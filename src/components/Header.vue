<template>
   <header>
      <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
         <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
               <strong>Client</strong>
            </router-link>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
            </a>
         </div>

         <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
               <router-link to="/" class="navbar-item">Home</router-link>
               <router-link to="/clients" class="navbar-item">Clients</router-link>
               <router-link to="/income" class="navbar-item">Income</router-link>
               <router-link to="/expense" class="navbar-item">Expense</router-link>
            </div>

            <div class="navbar-end">
               <div class="navbar-item">
                  <div class="buttons">
                     <router-link v-if="!isLoggedIn" to="/login" class="button is-primary">Log in</router-link>
                     <router-link v-if="!isLoggedIn" to="/register" class="button is-light">Sign up</router-link>
                     <a v-if="isLoggedIn" @click.prevent.stop="logout" class="button is-primary">Logout</a>
                  </div><!-- ./button -->
               </div><!-- ./navbar-item -->
            </div><!-- ./navbar-end -->
         </div>
      </nav>
   </header>
   
</template>

<script>
   import firebase from 'firebase'
   import { STORE_AUTH_RESET_USER } from '../store/modules/authStore'

   export default {
      name: "Header-component",
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
         }
      }
   }
</script>


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
            </div>

            <div class="navbar-end">
               <div class="navbar-item">
                  <div class="buttons">
                     <router-link to="/login" class="button is-primary">Log in</router-link>
                     <router-link to="/register" class="button is-light">Sign up</router-link>
                     <a @click.prevent.stop="logout" class="button is-primary">Logout</a>
                  </div><!-- ./button -->
               </div><!-- ./navbar-item -->
            </div><!-- ./navbar-end -->
         </div>
      </nav>
   </header>
   
</template>

<script>
   import firebase from 'firebase'

   export default {
      name: "Header-component",
      methods: {
         logout(){
            firebase.auth().signOut().then(() => {
               this.$router.replace('login');
            });
         }
      }
   }
</script>


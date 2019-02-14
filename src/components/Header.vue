<template>
   <header>
      <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
         <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
               <img src="https://www.weichieprojects.com/wp-content/uploads//2017/12/logo-black.png">
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
                     <router-link to="/register" class="button is-primary">Sign up</router-link>
                     <router-link to="/login" class="button is-light">Log in</router-link>
                  </div><!-- ./button -->
               </div><!-- ./navbar-item -->
            </div><!-- ./navbar-end -->
         </div>
      </nav>
   </header>
   
</template>

<script>
   export default {
      name: "Header-component"
   }
</script>


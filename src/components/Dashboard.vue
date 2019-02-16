<template>
   <section class="section">
      <div class="container">
         <h1 class="title">Welcome, {{this.$store.state.authStore.userData.username}}!</h1>
      </div>
   </section>   
</template>

<script>
   export default {
      name: 'Dashboard',
      data(){
         return{

         }
      }
   }
</script>


<template>
   <section class="section">
      <div class="container">
         <h1 class="title">
            Manage your clients
            <router-link to="add-clients" class="button is-primary is-pulled-right">
               <span class="icon">
                  <i class="fas fa-plus"></i>
               </span>
               <span>Add new</span>
            </router-link>
         </h1>
      </div>
   </section>
</template>

<script>
   export default {
      name: 'Clients',
      data(){
         return{
            
         }
      }
   }
</script>

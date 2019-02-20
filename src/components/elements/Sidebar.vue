<template>
   <div class="sidebar">
      <ul class="sidebar-menu">
         <li>
            <router-link to="/dashboard">
               <i class="fas fa-tachometer-alt"></i>
            </router-link>
         </li>
         <li>
            <router-link to="/clients">
               <i class="fas fa-clipboard-list"></i>
            </router-link>
         </li>
         <li>
            <router-link to="/income">
               <i class="fas fa-plus"></i>
            </router-link>
         </li>
         <li>
            <router-link to="/expense">
               <i class="fas fa-minus"></i>
            </router-link>
         </li>
      </ul>
   </div>
</template>

<script>
   export default {
      name: 'sidebar',
      data(){
         return{
            
         }
      }
   }
</script>
<template>
   <div class="container">
      <h2 class="flex-between">
         Manage your expenses.
         <router-link to="add-clients" class="btn btn-primary">
            <span class="icon">
               <i class="fas fa-plus"></i>
            </span>
            <span>Add new</span>
         </router-link>
      </h2>
   </div>
</template>

<script>
   export default {
      name: 'Expense'
   }
</script>


<template>
   <section class="section">
      <div class="container">
         <h1 class="title">Welcome, {{this.$store.state.authStore.userData.username}}!</h1>

         <div class="columns">
            <div class="column is-two-thirds">
               <div class="tabs">
                  <ul>
                     <li :class="{'is-active': activeTab === 1}">
                        <a @click.prevent.stop="switchTab(1)">
                           <span class="icon is-small">
                              <i class="fas fa-dollar-sign"></i>
                           </span>
                           <span>All</span>
                        </a>
                     </li>
                     <li :class="{'is-active': activeTab === 2}">
                        <a @click.prevent.stop="switchTab(2)">
                           <span class="icon is-small">
                              <i class="far fa-smile"></i>
                           </span>
                           <span>Income</span>
                        </a>
                     </li>
                     <li :class="{'is-active': activeTab === 3}">
                        <a @click.prevent.stop="switchTab(3)">
                           <span class="icon is-small">
                              <i class="far fa-frown"></i>
                           </span>
                           <span>Expenses</span>
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="column">
               <nav class="panel">
                  <p class="panel-heading">To Do's</p>
  
                  <div class="panel-block">
                     <p class="control has-icons-left">
                        <input class="input is-small" type="text" placeholder="Add Todo">
                        <span class="icon is-small is-left">
                           <i class="fas fa-plus"></i>
                        </span>
                     </p>
                  </div>
               </nav>
            </div>
         </div>
      </div>
   </section>   
</template>

<script>
   export default {
      name: 'Dashboard',
      data(){
         return{
            activeTab: 1
         }
      },
      methods: {
         switchTab(tabId){
            this.activeTab = tabId;
         }
      }
   }
</script>


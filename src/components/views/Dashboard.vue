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

               <DashboardGraph height="300" />

            </div>
            <div class="column">
               <nav class="panel">
                  {{successMessage}}
                  <p class="panel-heading">
                     To Do's
                     <small class="pull-right"><router-link to="/todos">View all</router-link></small>
                  </p>
  
                  <div class="panel-block">
                     <form action="" style="width: 100%" @submit.prevent.stop="addTodo">
                        <p class="control has-icons-left">
                           <input class="input is-small" type="text" placeholder="Add Todo" v-model="newTodo" />
                           <span class="icon is-small is-left">
                              <i class="fas fa-plus"></i>
                           </span>
                        </p>
                     </form>
                  </div>
                  <a v-for="(todo, i) in todos" class="panel-block" :class="{'markedAsDone': todo.selected}" :key="'todo_' + i" @click="markAsComplete(todo[1], $event), $set(todo, 'selected', !todo.selected)">
                     <span class="panel-icon">
                        <i class="far fa-check-circle"></i>
                     </span>
                     {{ todo[0] }}
                  </a>
               </nav>
            </div>
         </div>
      </div>
   </section>   
</template>

<script>
   import firebase from 'firebase'
   import db from '../../firestore'

   import DashboardGraph from '../graphs/DashboardGraph'

   export default {
      name: 'Dashboard',
      
      components:{
         DashboardGraph
      },

      data(){
         return{
            activeTab: 1,
            newTodo: '',
            todos: [],
            successMessage: '',
            selected: undefined,
         }
      },

      created(){
         if(this.$store.getters.getUserDoc){
            this.getTodos();
         }else{
            setTimeout(() => {
               this.getTodos();
            }, 1000);
         }
      },

      methods: {
         switchTab(tabId){
            this.activeTab = tabId;
         },

         addTodo(){
            db.collection('users')
               .doc(this.$store.getters.getUserDoc)
               .collection('todos')
               .add({
                  todo: this.newTodo,
                  complete: false,
                  added: firebase.firestore.Timestamp.fromDate(new Date())
               })
               .then(() => {
                  //FLASH SUCCESS
                  this.getTodos();
                  this.successMessage = 'Added a todo item!'
                  this.newTodo = '';
               })
               .catch(err => {
                  console.error('Error: ' + err);
               });
         },

         getTodos(){
            db.collection(`users/${this.$store.getters.getUserDoc}/todos`)
               .where('complete', '==', false)
               .get()
               .then(snapshot => {
                  snapshot.forEach(subDoc => {
                     if(this.todos.indexOf(subDoc.data().todo) === -1){
                        this.todos.push([subDoc.data().todo, subDoc.id]);
                     }
                  });
               })
               .catch(err => {
                  console.error('Error getting todos:', err);
               })
         },

         markAsComplete(docId){
            db.collection(`users/${this.$store.getters.getUserDoc}/todos`)
               .doc(docId)
               .update({complete: true});
         }
      },
   }
</script>
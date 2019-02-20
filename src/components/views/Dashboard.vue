<template>
   <div class="container">
      <h2>Welcome, {{ $store.state.authStore.userData.username }}!</h2>

      <div class="panel-row">
         <div class="panel small">
            <div class="panel-header">
               <h4>
                  <i class="fas fa-chart-line"></i>
                  Income
               </h4>
            </div>
            <div class="panel-body">
               <span class="currency-symbol">&euro;</span>
               3000
            </div>
         </div>
         <div class="panel small">
            <div class="panel-header">
               <h4>
                  <i class="fas fa-level-down-alt"></i>
                  Expenses
               </h4>
            </div>
            <div class="panel-body">
               <span class="currency-symbol">&euro;</span>
               3000
            </div>
         </div>
         <div class="panel small">
            <div class="panel-header">
               <h4>
                  <i class="fas fa-rocket"></i>
                  Net Worth
               </h4>
            </div>
            <div class="panel-body">
               <span class="currency-symbol">&euro;</span>
               3000
            </div>
         </div>
         <div class="panel small">
            <div class="panel-header">
               <h4>
                  <i class="fas fa-hand-holding-usd"></i>
                  Savings
               </h4>
            </div>
            <div class="panel-body">
               <span class="currency-symbol">&euro;</span>
               3000
            </div>
         </div>
      </div>

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

      <ul>
         <li 
            v-for="(todo, i) in todos" 
            :class="{'markedAsDone': todo.selected}" 
            :key="'todo_' + i" 
            @click="markAsComplete(todo[1], $event), $set(todo, 'selected', !todo.selected)">
            <span class="action">
               {{ todo[0] }}
            </span>
         </li>
      </ul>
   </div>
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
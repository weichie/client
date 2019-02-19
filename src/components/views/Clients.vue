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

         <table class="table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
               <tr>
                  <th>Company</th>
                  <th>BTW Number</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Contact</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(client, i) in clients" :key="'client_' + i">
                  <td>{{ client.companyName }}</td>
                  <td>{{ client.taxId }}</td>
                  <td>{{ client.email }}</td>
                  <td>{{ client.phone }}</td>
                  <td>{{ client.address + ', ' + client.zip + " " + client.city }}</td>
                  <td>{{ client.firstname + " " + client.lastname }}</td>
               </tr>
            </tbody>
         </table>
      </div>
   </section>
</template>

<script>
   import firebase from 'firebase'
   import db from '../../firestore'

   export default {
      name: 'Clients',
      data(){
         return{
            clients: []
         }
      },
      mounted(){
         this.getClientInfo();
      },
      methods: {
         getClientInfo(){
            db.collection('clients')
               .get()
               .then(snapshot => {
                  snapshot.forEach(doc => {
                     this.clients.push(doc.data());
                  });
               })
               .catch(err => console.error(err));
         }
      }
   }
</script>

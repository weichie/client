<template>
   <div class="container">
      <h1>{{ clientInfo.companyName }}</h1>
      <h2 class="small">
         {{clientInfo.address}},<br>
         {{clientInfo.zip}} {{clientInfo.city}}<br>
         {{clientInfo.country}}
      </h2>

      <div class="panel-row">
         <div class="panel semi">
            <div class="panel-header">
               <h4 class="toUpper bold align-center flex-between">
                  Client Info
                  <router-link to="/" class="btn btn-primary">
                     Edit
                  </router-link>
               </h4>
            </div>
            <div class="panel-body">
               <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                  <tbody>
                     <tr v-for="(value, key, index) in clientInfo" :key="'row_' + index">
                        <td><strong class="toCamel">{{ key }}</strong></td>
                        <td>{{ value }}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
         <div class="panel small">
            <div class="panel-header">
               <h4 class="toUpper bold">
                  Recent Invoices
               </h4>
               <a class="panel-block">
                  <strong>
                     #2019003
                     <span class="is-pulled-right">31/01/2019</span>
                  </strong>
                  <p>€ 2.722,50</p>
               </a>
               <a class="panel-block">
                  <strong>
                     #2019003
                     <span class="is-pulled-right">31/01/2019</span>
                  </strong>
                  <p>€ 2.722,50</p>
               </a>
               <a class="panel-block">
                  <strong>
                     #2019003
                     <span class="is-pulled-right">31/01/2019</span>
                  </strong><br>
                  <p>€ 2.722,50</p>
               </a>

               <button class="btn btn-block btn-secondary">
                  View All Invoices
               </button>
            </div>
         </div>
      </div>
   </div>         
</template>

<script>
   import firebase from 'firebase'
   import db from '../../firestore'

   export default {
      name: 'Client',
      data(){
         return{
            clientInfo: null,
            errorMessage: null
         }
      },
      mounted(){
         db.collection('clients')
            .doc(this.$route.params.id)
            .get()
            .then(snapshot => {
               this.clientInfo = snapshot.data();
            })
            .catch(err => {
               this.errorMessage = err.message
            });
      },
   }
</script>

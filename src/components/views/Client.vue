<template>
   <section class="section">
      <div class="container">
         <p v-if="errorMessage">{{errorMessage}}</p>
         
         <h1 class="title">{{ clientInfo.companyName }}</h1>
         <h2 class="subtitle">
            {{clientInfo.address}},<br>
            {{clientInfo.zip}} {{clientInfo.city}}<br>
            {{clientInfo.country}}
         </h2>

         <div class="columns">
            <div class="column is-three-fifths">
               <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                  <tbody>
                     <tr v-for="(value, key, index) in clientInfo" :key="'row_' + index">
                        <td><strong>{{ key }}</strong></td>
                        <td>{{ value }}</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div class="column is-two-fifths">
               <nav class="panel">
                  <h3 class="panel-heading">
                     Recent Invoices
                  </h3>
               
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
                  <div class="panel-block">
                     <button class="button is-link is-outlined is-fullwidth">
                        View All Invoices
                     </button>
                  </div>
               </nav>
            </div>
         </div>
      </div>
   </section>
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

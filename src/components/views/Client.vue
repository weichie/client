<template>
   <div class="container" v-if="clientInfo">
      <div class="panel-row">
         <div class="panel semi transparent">
            <h1>{{ clientInfo.companyName }}</h1>
            <h2 class="small">
               {{clientInfo.address}},<br>
               {{clientInfo.zip}} {{clientInfo.city}}<br>
               {{clientInfo.country}}
            </h2>
         </div>
         <div class="panel small transparent client-actions">
            <router-link to="/" class="btn btn-big btn-block btn-primary text-center">
               <i class="fas fa-file"></i>
               Create invoice
            </router-link>
            <router-link to="/" class="btn btn-big btn-block btn-secondary text-center">
               <i class="fas fa-download"></i>
               Export Client
            </router-link>
         </div>
      </div>

      <div class="panel-row">
         <div class="panel semi">
            <div class="panel-header">
               <h4 class="toUpper bold align-center flex-between">
                  Client Info
                  <router-link :to="`/client/${this.$route.params.id}/edit`" class="btn btn-primary">
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

      <div class="panel-row">
         <div class="panel semi">
            <div class="panel-header">
               <h4 class="toUpper bold align-center flex-between">
                  Server Info
                  <router-link :to="`/client/${this.$route.params.id}/server`" class="btn btn-primary">
                     Edit
                  </router-link>
               </h4>
            </div>
            <div class="panel-body" v-if="serverInfo">
               <div class="data-row" v-if="serverInfo.cpLink">
                  <h5>Control Panel</h5>
                  <table>
                     <tbody>
                        <tr>
                           <td><strong class="toCamel">URL</strong></td>
                           <td>{{ serverInfo.cpLink }}</td>
                        </tr>
                        <tr>
                           <td><strong class="toCamel">Platform</strong></td>
                           <td><a :href="`${serverInfo.CmsAdmin}`">{{serverInfo.cpType}}</a></td>
                        </tr>
                        <tr>
                           <td><strong class="toCamel">Username</strong></td>
                           <td>{{ serverInfo.cpUsername }}</td>
                        </tr>
                        <tr>
                           <td><strong class="toCamel">Password</strong></td>
                           <td>{{ serverInfo.cpPassword }}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>

               <div class="data-row" v-if="serverInfo.cmsAdmin">
                  <h5>CMS</h5>
                  <table>
                     <tbody>
                        <tr>
                           <td><strong class="toCamel">CMS Type</strong></td>
                           <td>{{ serverInfo.cmsType }}</td>
                        </tr>
                        <tr>
                           <td><strong class="toCamel">Admin Link</strong></td>
                           <td><a :href="serverInfo.CmsAdmin">{{serverInfo.cmsAdmin}}</a></td>
                        </tr>
                        <tr>
                           <td><strong class="toCamel">Username</strong></td>
                           <td>{{ serverInfo.cmsUsername }}</td>
                        </tr>
                        <tr>
                           <td><strong class="toCamel">Password</strong></td>
                           <td>{{ serverInfo.cmsPassword }}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>

               <div class="data-row" v-if="serverInfo.ftpHost">
                  <h5>FTP</h5>
                  <table>
                     <tbody>
                        <tr>
                           <td><strong class="toCamel">Host</strong></td>
                           <td>{{ serverInfo.ftpHost }}</td>
                        </tr>
                        <tr v-if="serverInfo.ftpPort">
                           <td><strong class="toCamel">Port</strong></td>
                           <td>{{serverInfo.ftpPort}}</td>
                        </tr>
                        <tr>
                           <td><strong class="toCamel">Username</strong></td>
                           <td>{{ serverInfo.ftpUsername }}</td>
                        </tr>
                        <tr>
                           <td><strong class="toCamel">Password</strong></td>
                           <td>{{ serverInfo.ftpPassword }}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
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
            serverInfo: null,
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
         
         db.collection('clients')
            .doc(this.$route.params.id)
            .collection('server')
            .get()
            .then(snapshot => {
               snapshot.forEach(server => {
                  this.serverInfo = server.data();
               });
            })
            .catch(err => {
               this.errorMessage = err.message;
            });
      },
   }
</script>

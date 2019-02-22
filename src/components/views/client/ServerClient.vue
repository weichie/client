<template>
   <div class="container">
      <h2>Edit Server Details for&nbsp;<span v-if="clientInfo">{{ clientInfo.companyName }}</span>.</h2>

       <div class="panel-row">
         <div class="panel medium">
            <form @submit.prevent="addServer" v-if="clientInfo">
               <strong>Control Panel</strong>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="CP Name" v-model="server.cpType" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="CP Link" v-model="server.cpLink" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="email" placeholder="CP Username" v-model="server.cpUsername" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="tel" placeholder="CP Email" v-model="server.cpUsername" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="CP Password" v-model="server.cpPassword" />
               </div>

               <strong>FTP Information</strong>
               <div class="input-group medium">
                  <input class="input" type="tel" id="phone" placeholder="Host" v-model="server.ftpHost" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" id="taxid" placeholder="Port" v-model="server.ftpPort" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" id="company" placeholder="Username" v-model="server.ftpUsername" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" id="website" placeholder="Password" v-model="server.ftpPassword" />
               </div>

               <strong>Database Information</strong>
               <div class="input-group medium">
                  <input class="input" type="tel" placeholder="Host" v-model="server.dbHost" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="Database" v-model="server.dbDatabase" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="Username" v-model="server.dbUsername" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="Password" v-model="server.dbPassword" />
               </div>

               <strong>Site Login Information</strong>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="CMS Name" v-model="server.cmsType" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="Login URL" v-model="server.cmsAdmin" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="Username" v-model="server.cmsUsername" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" placeholder="password" v-model="server.cmsPassword" />
               </div>

               <strong>Extra</strong>
               <div class="input-group large">
                  <textarea class="input" placeholder="Extra info" rows="5" v-model="server.extra"></textarea>
               </div>

               
               <div class="input-group large text-right">
                  <small class="error red" v-if="errorMessage">
                     {{ errorMessage }}
                  </small>
                  <small class="success green" v-if="successMessage">
                     {{ successMessage }}
                  </small>
                  <button class="btn btn-primary">{{action}} record</button>
               </div>
            </form>
         </div>
      </div>
   </div>         
</template>

<script>
   import firebase from 'firebase'
   import db from '@/firestore'

   export default {
      name: 'ServerClient',
      data(){
         return{
            clientInfo: null,
            serverDoc: null,
            server: {
               cpType: '',
               cpLink: '',
               cpUsername: '',
               cpUsername: '',
               cpPassword: '',
               dbHost: '',
               dbDatabase: '',
               dbUsername: '',
               dbPassword: '',
               ftpHost: '',
               ftpUsername: '',
               ftpPort: '',
               ftpPassword: '',
               cmsType: '',
               cmsAdmin: '',
               cmsUsername: '',
               cmsPassword: '',
               extra: '',
            },
            successMessage: null,
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
                  this.serverDoc = server.id;
                  this.server = server.data();
               });
            })
            .catch(err => {
               this.errorMessage = err.message
            });
      },
      computed: {
         action(){
            return this.serverDoc ? 'Update' : 'Add';
         }
      },
      methods: {
         addServer(){
            if(!this.serverDoc){
               db.collection('clients')
                  .doc(this.$route.params.id)
                  .collection('server')
                  .add(this.server)
                  .then(() => this.successMessage = 'Server data added!')
                  .catch(err => this.errorMessage = err.message);
            }else{
               const serverRef = db.collection('clients').doc(this.$route.params.id).collection('server').doc(this.serverDoc);

               serverRef.update(this.server)
                  .then(() => this.successMessage = 'Server data added!')
                  .catch(err => this.errorMessage = err.message);
            }
         }
      }
   }
</script>


<template>
   <div class="container">
      <h2>Edit client info.</h2>

       <div class="panel-row">
         <div class="panel medium">
            <form @submit.prevent="updateClient" v-if="clientInfo">
               <div class="input-group medium">
                  <input class="input" type="text" id="firstname" placeholder="Firstname" v-model="clientInfo.firstname" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" id="lastname" placeholder="Lastname" v-model="clientInfo.lastname" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="email" id="email" placeholder="Email" v-model="clientInfo.email" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="tel" id="phone" placeholder="Phone" v-model="clientInfo.phone" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" id="company" placeholder="Company" v-model="clientInfo.companyName" />
               </div>
               <div class="input-group medium">
                  <input class="input" type="text" id="taxid" placeholder="BTW BE" v-model="clientInfo.taxId" />
               </div>
               <div class="input-group large">
                  <input class="input" type="text" id="website" placeholder="Website" v-model="clientInfo.website" />
               </div>


               <div class="input-group large">
                  <input class="input" type="text" id="Address" placeholder="address" v-model="clientInfo.address" />
               </div>

               <div class="input-group third">
                  <input class="input" type="text" id="zip" placeholder="ZIP-code" v-model="clientInfo.zip" />
               </div>
               <div class="input-group third">
                  <input class="input" type="text" id="city" placeholder="City" v-model="clientInfo.city" />
               </div>

               <div class="input-group third">
                  <input class="input" type="text" id="country" placeholder="Country" v-model="clientInfo.country" />
               </div>
               
               <div class="input-group large text-right">
                  <small class="error red" v-if="errorMessage">
                     {{ errorMessage }}
                  </small>
                  <small class="success green" v-if="successMessage">
                     {{ successMessage }}
                  </small>
                  <button class="btn btn-primary">Update record</button>
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
      name: 'EditClient',
      data(){
         return{
            clientInfo: null,
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
      },
      methods: {
         updateClient(){
            var clientRef = db.collection('clients').doc(this.$route.params.id);

            let setWithMerge = clientRef.set(this.clientInfo, {merge: true})
               .then(() => this.successMessage = 'Client info updated!')
               .catch(err => this.errorMessage = err.message);
         }
      }
   }
</script>


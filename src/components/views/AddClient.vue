<template>
   <section class="section">
      <div class="container">
         <h1 class="title">Add new client</h1>

         <p v-show="errorMessage" class="has-text-danger">{{errorMessage}}</p>

         <form @submit.prevent="addClient">
            <div class="field">
               <label for="firstname" class="label">Contact Firstname</label>
               <div class="control">
                  <input class="input" type="text" id="firstname" placeholder="Firstname" v-model="clientInfo.firstname" />
               </div>
            </div>

            <div class="field">
               <label for="lastname" class="label">Contact Lastname</label>
               <div class="control">
                  <input class="input" type="text" id="lastname" placeholder="Lastname" v-model="clientInfo.lastname" />
               </div>
            </div>

            <div class="field">
               <label for="company" class="label">Company Name</label>
               <div class="control">
                  <input class="input" type="text" id="company" placeholder="Company" v-model="clientInfo.companyName" />
               </div>
            </div>

            <div class="field">
               <label for="taxid" class="label">Company Tax ID</label>
               <div class="control">
                  <input class="input" type="text" id="taxid" placeholder="BTW BE" v-model="clientInfo.taxId" />
               </div>
            </div>

            <div class="field">
               <label for="email" class="label">Contact Email</label>
               <div class="control">
                  <input class="input" type="email" id="email" placeholder="Email" v-model="clientInfo.email" />
               </div>
            </div>
            <div class="field">
               <label for="phone" class="label">Contact Phone</label>
               <div class="control">
                  <input class="input" type="tel" id="phone" placeholder="Phone" v-model="clientInfo.phone" />
               </div>
            </div>
            <div class="field">
               <label for="address" class="label">Street Address</label>
               <div class="control">
                  <input class="input" type="text" id="address" v-model="clientInfo.address" />
               </div>
            </div>
            <div class="field">
               <label for="zip" class="label">Zip Code</label>
               <div class="control">
                  <input class="input" type="text" id="zip" v-model="clientInfo.zip" />
               </div>
            </div>
            <div class="field">
               <label for="city" class="label">City</label>
               <div class="control">
                  <input class="input" type="text" id="city" v-model="clientInfo.city" />
               </div>
            </div>
            <div class="field">
               <label for="country" class="label">Country</label>
               <div class="control">
                  <input class="input" type="text" id="country" v-model="clientInfo.country" />
               </div>
            </div>

            <div class="field is-grouped">
               <div class="control">
                  <button class="button is-primary">Add Client</button>
               </div>
            </div>
         </form>
      </div>
   </section>
</template>

<script>
   import firebase from 'firebase'
   import db from '../../firestore'
   export default {
      name: 'AddClient',
      data(){
         return{
            clientInfo: {
               firstname: '',
               lastname: '',
               companyName: '',
               taxId: '',
               email: '',
               phone: '',
               address: '',
               zip: '',
               city: '',
               country: '',
            },
            errorMessage: ''
         }
      },
      methods: {
         addClient(){
            db.collection('clients').add(
               this.clientInfo
            ).then(() => {
               this.$router.replace('clients')
            }).catch(err => {
               this.errorMessage = err.message;
            });
         }
      }
   }
</script>


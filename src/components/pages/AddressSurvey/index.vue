<template>
  <div id="address-survey">
    <h3 class="md-display-1">Address Survey</h3>
    <SearchArea v-if="searchResultsGuests.length==0" @submitSearch="submitSearch"></SearchArea>
    <!-- <pre>{{searchResultsFamily}}</pre> -->
    <!-- <pre>{{searchResultsGuests}}</pre> -->
    <div v-else>
      <FamilyData :family="searchResultsFamily"/>
      <GuestData v-for="guest in searchResultsGuests" :key="guest.id" :guest="guest"></GuestData>
    </div>

    <!-- Snackbar popup for error display -->
    <md-snackbar :md-duration="4000" :md-active.sync="showErrorSnackbar" md-persistent>
      {{errorMessage}}
      <md-button class="md-primary" @click="showErrorSnackbar = false">Dismiss</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import { db } from '../../../main.js'
  import SearchArea from './SearchArea'
  import FamilyData from './FamilyData'
  import GuestData from './GuestData'
  export default {
    data () {
      return {
        guestsRef: null,
        familiesRef: null,
        searchTerm: '',
        searchResultsFamily: {},
        searchResultsGuests: [],
        showErrorSnackbar: false,
        errorMessage: 'Error'
      }
    },
    methods: {
      submitSearch (searchTerm) {
        this.searchTerm = searchTerm
        // Clear existing search results
        this.searchResultsFamily = {}
        this.searchResultsGuests = []

        // Fetch the single guest matching the email address
        this.guestsRef.where('email', '==', searchTerm).get()
          .then(snap1 => {
            // No results
            if (snap1.empty) {
              throw new Error(`Could not find email "${searchTerm}"`)
            }
            // Retrieve the guest's familyId
            const familyId = snap1.docs[0].data().familyId
            // Query the family data and all associated guests' data
            return Promise.all([
              this.familiesRef.doc(familyId).get(),
              this.guestsRef.where('familyId', '==', familyId).get()
            ]).then(snaps => {
              // Store the family data
              this.searchResultsFamily = snaps[0].data()
              // Store each guest's data
              snaps[1].forEach(snap => {
                this.searchResultsGuests.push(snap.data())
              })
            })
          }).catch(err => {
            this.errorMessage = `Error: ${err.message}`
            this.showErrorSnackbar = true
          })
      }
    },
    created () {
      this.guestsRef = db.collection('guests')
      this.familiesRef = db.collection('families')
    },
    components: {
      SearchArea,
      FamilyData,
      GuestData
    }
  }
</script>

<style scoped>

</style>
<template>
  <div id="home">
    <h3 class="md-display-1">Address Survey</h3>
    <SearchArea v-if="searchResultsGuests.length==0" @submitSearch="submitSearch"></SearchArea>
    <pre>{{searchResultsFamily}}</pre>
    <pre>{{searchResultsGuests}}</pre>
  </div>
</template>

<script>
  import { db } from '../../../main.js'
  import SearchArea from './SearchArea'
  export default {
    data () {
      return {
        guestsRef: null,
        familiesRef: null,
        searchTerm: '',
        searchResultsFamily: {},
        searchResultsGuests: [],
        showSnackbarNoResults: false
      }
    },
    methods: {
      submitSearch (searchTerm) {
        this.searchTerm = searchTerm
        this.searchResultsFamily = {}
        this.searchResultsGuests = []

        // Fetch the single guest matching the email address
        this.guestsRef.where('email', '==', searchTerm).get()
          .then(snap1 => {
            // No results
            if (snap1.empty) {
              this.showSnackbarNoResults = true
            } else {
              // Retrieve the guest's familyId
              const familyId = snap1.docs[0].data().familyId
              // Query for all guests in the family
              this.guestsRef.where('familyId', '==', familyId).get()
                .then(snap2 => {
                  // Add each guest of the family into the results array
                  snap2.forEach(guestRef => {
                    this.searchResultsGuests.push(guestRef.data())
                  })
                })
              // Query for the family's data (address, etc)
              this.familiesRef.doc(familyId).get()
                .then(snap3 => {
                  console.log(snap3)
                  this.searchResultsFamily = snap3.data()
                })
            }
          }).catch(err => {
            console.error('Error searching for ' + searchTerm, err)
          })
      }
    },
    created () {
      this.guestsRef = db.collection('guests')
      this.familiesRef = db.collection('families')
    },
    components: {
      SearchArea
    }
  }
</script>

<style scoped>

</style>
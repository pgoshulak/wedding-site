<template>
  <div id="address-survey">
    <!-- <h3 class="md-headline">{{titleText}}</h3> -->
    <SearchArea v-if="searchResultsGuests.length==0" @submitSearch="submitSearch"></SearchArea>

    <md-steppers v-else md-vertical :md-active-step.sync="activeStep">

      <md-step id="accept-reject" md-label="Send my invite?">
        <p>Welcome, {{searchResultsFamily.name || "no name"}}</p>
        <md-button class="md-primary md-raised" @click="activeStep = 'family'">Send my invite</md-button>
        <md-button>We cannot attend</md-button>
      </md-step>

      <md-step id="family" md-label="Address">
        <p>Where should your invitation be sent?</p>
        <FamilyData :familyId="foundFamilyId" :resultData="searchResultsFamily" :lastSaveRequest="lastSaveRequest"/>
        <md-button class="md-primary md-raised" @click="activeStep = 'guests'">Continue</md-button>
        <md-button @click="activeStep = 'accept-reject'">Back</md-button>
      </md-step> 

      <md-step id="guests" md-label="Guests">
        <GuestData 
          v-for="guest in searchResultsGuests" 
          :key="guest.id" 
          :guest="guest" 
          @newGuestChange="newGuestChange"
        ></GuestData>

        <md-button class="md-primary md-raised" @click="saveChanges">Send my invite!</md-button>
        <md-button @click="activeStep = 'family'">Back</md-button>
      </md-step>

    </md-steppers> 
    
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
  // import sampleData from './sample-data.json'
  
  export default {
    data () {
      return {
        titleText: 'Address Survey',
        guestsRef: null,
        familiesRef: null,
        searchTerm: '',
        foundFamilyId: '',
        searchResultsFamily: {},
        searchResultsGuests: [],
        activeStep: 'accept-reject',
        // searchResultsFamily: sampleData.searchResultsFamily,
        // searchResultsGuests: sampleData.searchResultsGuests,
        showErrorSnackbar: false,
        errorMessage: 'Error',
        lastSaveRequest: null
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
            this.foundFamilyId = familyId
            // Query the family data and all associated guests' data
            return Promise.all([
              this.familiesRef.doc(familyId).get(),
              this.guestsRef.where('familyId', '==', familyId).get()
            ]).then(snaps => {
              // Store the family data
              this.searchResultsFamily = snaps[0].data()
              this.titleText = this.searchResultsFamily.name
              // Store each guest's data
              snaps[1].forEach(snap => {
                this.searchResultsGuests.push({...snap.data(), id: snap.id})
              })
            })
          }).catch(err => {
            this.errorMessage = `Error: ${err.message}`
            this.showErrorSnackbar = true
          })
      },
      saveChanges () {
        console.log('index -> saveChanges()')
        // lastSaveRequest is a 'watched prop' in the family/guest child elements.
        // Change this value triggers the children to save to firebase
        // this.lastSaveRequest = new Date()
      },
      newGuestChange (guestId, data) {
        console.log('newGuestChange for', guestId, data)
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

<style >
  #survey .md-stepper-content {
    padding: 0px 12px 0px 40px
  }
</style>
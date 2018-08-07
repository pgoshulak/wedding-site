<template>
  <div id="address-survey">
    <!-- <h3 class="md-headline">{{titleText}}</h3> -->
    <SearchArea v-if="searchResultsGuests.length==0" @submitSearch="submitSearch" :isLoading="isLoading"></SearchArea>

    <md-steppers v-else md-vertical :md-active-step.sync="activeStep">

      <md-step id="family" md-label="Address">
        <md-button class="md-raised" id="reject-btn" @click="showRsvpRejectDialog = true">We cannot attend</md-button>
        <p>Hello, <strong>{{searchResultsFamily.name || "no name"}}</strong>!
        Where should your invitation be sent?</p>
        <FamilyData 
          :familyId="foundFamilyId" 
          :resultData="searchResultsFamily" 
          @newFamilyChange="newFamilyChange"
          />
        <md-button class="md-primary md-raised" @click="activeStep = 'guests'">Next</md-button>
      </md-step> 

      <md-step id="guests" :md-label="`Guests ${searchResultsGuests ? '(' + searchResultsGuests.length + ')' : ''}`">
        <p>Your email and phone number are optional. You will have the choice of receiving updates, 
          such as receiving directions to the venue via text message on the wedding day</p>
        <GuestData 
          v-for="guest in searchResultsGuests" 
          :key="guest.id" 
          :guest="guest" 
          @newGuestChange="newGuestChange"
          />
        <md-button class="md-primary md-raised" @click="saveChanges('submit')" :disabled="isLoading">
          <md-progress-spinner id="submit-spinner" v-if="isLoading" :md-diameter="12" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
          Send my invite!
        </md-button>
        <md-button @click="activeStep = 'family'">Back</md-button>
      </md-step>

    </md-steppers> 
    
    <!-- Snackbar popup for error display -->
    <md-snackbar :md-duration="4000" :md-active.sync="showErrorSnackbar" md-persistent>
      {{errorMessage}}
      <md-button class="md-primary" @click="showErrorSnackbar = false">Dismiss</md-button>
    </md-snackbar>

    <!-- Dialog for early RSVP "reject" -->
    <md-dialog :md-active.sync="showRsvpRejectDialog">
      <md-dialog-title>Send RSVP "no"?</md-dialog-title>
      <md-dialog-content>
        Are you sure you cannot attend Steph and Peter's wedding on June 1 2019? 
        By clicking &laquo; RSVP "NO" &raquo;, you will not receive an invitation.
      </md-dialog-content>
      <md-dialog-actions>
        <md-button id="reject-warning" class="md-raised" @click="confirmRejection">
          <md-progress-spinner id="submit-spinner" v-if="isLoading" :md-diameter="12" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
          RSVP "no"
        </md-button>
        <md-button class="md-raised" @click="showRsvpRejectDialog = false">cancel, please send my invite</md-button>
      </md-dialog-actions>
    </md-dialog>

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
        searchTerm: '',
        foundFamilyId: '',
        searchResultsFamily: {},
        searchResultsGuests: [],
        activeStep: 'family',
        // searchResultsFamily: sampleData.searchResultsFamily,
        // searchResultsGuests: sampleData.searchResultsGuests,
        showErrorSnackbar: false,
        showRsvpRejectDialog: false,
        errorMessage: 'Error',
        isLoading: false,
        guestsRef: null,
        familiesRef: null,
        batchUpdates: null
      }
    },
    methods: {
      submitSearch (searchTerm, searchType) {
        this.isLoading = true
        this.searchTerm = searchTerm
        // Clear existing search results
        this.searchResultsFamily = {}
        this.searchResultsGuests = []

        // Fetch the single guest matching the email address
        this.guestsRef.where(searchType, '==', searchTerm).get()
          .then(snap1 => {
            // No results
            if (snap1.empty) {
              throw new Error(`Could not find ${searchType} "${searchTerm}"`)
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
              this.isLoading = false
            })
          }).catch(err => {
            this.errorMessage = `Error: ${err.message}`
            this.showErrorSnackbar = true
            this.isLoading = false
          })
      },
      saveChanges (type = 'submit') {
        this.isLoading = true
        this.batchUpdates.commit().then(() => {
          if (type === 'submit') {
            this.$router.push('confirm-submit')
          } else {
            this.$router.push('confirm-reject')
          }
        }).catch(err => {
          console.error('Error committing batch:', err)
          this.errorMessage = `Error: ${err.message}`
          this.showErrorSnackbar = true
          this.isLoading = false
        })
      },
      newGuestChange (guestId, data) {
        let thisGuestRef = this.guestsRef.doc(guestId)
        this.batchUpdates.set(thisGuestRef, data, {merge: true})
      },
      newFamilyChange (data) {
        let thisFamilyRef = this.familiesRef.doc(this.foundFamilyId)
        this.batchUpdates.set(thisFamilyRef, data, {merge: true})
      },
      confirmRejection () {
        for (let guest of this.searchResultsGuests) {
          this.newGuestChange(guest.id, {rsvp: false})
        }
        this.saveChanges('reject')
      }
    },
    created () {
      this.guestsRef = db.collection('guests')
      this.familiesRef = db.collection('families')
      this.batchUpdates = db.batch()
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
  #submit-spinner circle {
    stroke: #fff;
    stroke-opacity: 0.9
  }

  #reject-btn {
    float: right;
  }

  #reject-warning {
    background-color: #f44336;
    color: white;
  }
</style>
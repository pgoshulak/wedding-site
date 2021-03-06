<template>
  <div id="address-survey">
    <SearchArea v-if="searchResultsGuests.length==0" @submitSearch="submitSearch" :isLoading="isLoading" :searchErrors="searchErrors" :simpleGuestDbSearch="simpleGuestDbSearch">
      <md-button @click="$emit('closeAddressSurvey')">Back</md-button>
    </SearchArea>

    <md-steppers v-else-if="completedType===''" md-vertical :md-active-step.sync="activeStep">

      <md-step id="family" md-label="Address">
        <p>
          Hello, <strong>{{searchResultsFamily.name || "no name"}}</strong>!
          Where should your invitation be sent?
          <br/>
          <small class="text-muted">(Can't attend? <a @click="showRsvpRejectDialog=true">Click here</a>)</small>
        </p>
        <FamilyData
          :familyId="foundFamilyId"
          :resultData="searchResultsFamily"
          @newFamilyChange="newFamilyChange"
          />
        <md-button class="md-primary md-raised" @click="activeStep = 'guests'">Next</md-button>
      </md-step>

      <md-step id="guests" :md-label="`Guests ${searchResultsGuests ? '(' + searchResultsGuests.length + ')' : ''}`">
        <p class="info-section">
          <md-icon>info</md-icon>
          Your email and phone number are optional. You will have the choice of receiving updates,
          such as receiving directions to the venue via text message on the wedding day</p>
        <GuestData
          v-for="guest in searchResultsGuests"
          :key="guest.id"
          :guest="guest"
          @newGuestChange="newGuestChange"
          />
        <md-button class="md-primary md-raised" @click="confirmInviteRequest" :disabled="isLoading">
          <md-progress-spinner id="submit-spinner" v-if="isLoading" :md-diameter="12" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
          Send my invite!
        </md-button>
        <md-button @click="activeStep = 'family'">Back</md-button>
      </md-step>

    </md-steppers>

    <ConfirmSubmit v-else-if="completedType==='submit'">
      <md-button @click="$emit('closeAddressSurvey')">Back</md-button>
    </ConfirmSubmit>

    <ConfirmReject v-else-if="completedType==='reject'">
      <md-button @click="$emit('closeAddressSurvey')">Back</md-button>
    </ConfirmReject>

    <!-- Snackbar popup for error display -->
    <md-snackbar :md-duration="6000" :md-active.sync="showErrorSnackbar" md-persistent>
      {{errorMessage}}
      <md-button class="md-primary" @click="showErrorSnackbar = false">Dismiss</md-button>
    </md-snackbar>

    <!-- Dialog for early RSVP "reject" -->
    <md-dialog :md-active.sync="showRsvpRejectDialog">
      <md-dialog-title>Send RSVP "no"?</md-dialog-title>
      <md-dialog-content>
        Are you sure you cannot attend Steph and Peter's wedding on June 1 2019?
        By clicking <kbd class="reject-outline">RSVP&nbsp;"NO"</kbd>, you will not receive an invitation.
      </md-dialog-content>
      <md-dialog-actions>
        <md-button id="reject-warning" class="md-raised" @click="confirmRejection">
          <md-progress-spinner id="submit-spinner" v-if="isLoading" :md-diameter="12" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
          RSVP "no"
        </md-button>
        <md-button class="md-raised" @click="showRsvpRejectDialog = false">cancel, send my invite</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
  import { db } from '../../../main.js'
  import SearchArea from './SearchArea'
  import FamilyData from './FamilyData'
  import GuestData from './GuestData'
  import ConfirmSubmit from './ConfirmSubmit'
  import ConfirmReject from './ConfirmReject'
  import Fuse from 'fuse.js'

  // import sampleData from './sample-data.json'
  let sampleData = null

  export default {
    data () {
      return {
        titleText: 'Address Survey',
        foundFamilyId: '',
        searchResultsFamily: sampleData ? sampleData.searchResultsFamily : {},
        searchResultsGuests: sampleData ? sampleData.searchResultsGuests : [],
        activeStep: 'family',
        showErrorSnackbar: false,
        showRsvpRejectDialog: false,
        errorMessage: 'Error',
        isLoading: false,
        guestsRef: null,
        familiesRef: null,
        errorsRef: null,
        batchUpdates: null,
        completedType: '',
        searchErrors: [],
        simpleGuestDbSearch: null
      }
    },
    methods: {
      submitSearch (searchTerm, searchType) {
        this.isLoading = true
        // Clear existing search results
        this.searchResultsFamily = {}
        this.searchResultsGuests = []

        // Format the search term for firebase's pickiness :(
        let searchTermSubmitted = ''
        if (searchType === 'phone') {
          searchTermSubmitted = searchTerm
        } else if (searchType === 'email') {
          searchTermSubmitted = searchTerm.toLowerCase()
        } else {
          searchTermSubmitted = searchTerm.trim()
        }

        // Fetch the single guest matching the email address
        this.guestsRef.where(searchType, '==', searchTermSubmitted).get()
          .then(snap1 => {
            // No results
            if (snap1.empty) {
              this.searchErrors.push(searchTerm)
              this.logSearchError(searchType, searchTerm, searchTermSubmitted)
              let errorMessage = `Could not find ${searchType} "${searchTerm}". `

              throw new Error(errorMessage)
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
            // this.$router.push('confirm-submit')
            this.completedType = 'submit'
          } else {
            // this.$router.push('confirm-reject')
            this.completedType = 'reject'
            this.showRsvpRejectDialog = false
          }
          this.$emit('addressSubmitted')
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
          this.newGuestChange(guest.id, {rsvp: 'EARLY_REJECT'})
        }
        this.saveChanges('reject')
      },
      confirmInviteRequest () {
        for (let guest of this.searchResultsGuests) {
          this.newGuestChange(guest.id, {rsvp: 'REQUEST_INVITE'})
        }
        this.saveChanges('submit')
      },
      logSearchError (searchType, searchTerm, searchTermSubmitted) {
        let timestamp = this.formattedDate() + 'T' + this.formattedTime()
        this.errorsRef.doc(timestamp).set({
          type: searchType,
          userSearch: searchTerm,
          formatted: searchTermSubmitted
        }).catch(err => {
          console.error(err)
        })
      },
      formattedDate () {
        let d = new Date()
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        let year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
      },
      formattedTime () {
        let d = new Date()
        let hour = '' + d.getHours()
        let min = '' + d.getMinutes()
        let sec = d.getSeconds()
        let mil = d.getMilliseconds()

        if (hour.length < 2) hour = '0' + hour
        if (min.length < 2) min = '0' + min
        if (sec.length < 2) sec = '0' + sec

        return [[hour, min, sec].join(':'), mil].join('.')
      },
      populateSimpleGuestDb () {
        db.collection('guest-names-ids').doc('guests').get().then(doc => {
          this.simpleGuestDbSearch = new Fuse(JSON.parse(doc.data().all), {
            keys: ['name'],
            includeScore: true
          })
        })
      }
    },
    created () {
      this.guestsRef = db.collection('guests')
      this.familiesRef = db.collection('families')
      this.errorsRef = db.collection('errors')
      this.batchUpdates = db.batch()
      this.populateSimpleGuestDb()
    },
    components: {
      SearchArea,
      FamilyData,
      GuestData,
      ConfirmSubmit,
      ConfirmReject
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

  /* @media screen and (min-width: ); */
  #reject-btn {
    float: right;
  }

  #reject-warning {
    background-color: #f44336;
    color: white;
  }
  .reject-outline {
    border: 1px solid #f44336;
    color: #f44336;
    padding: 2px 4px;
    margin: initial 2px;
  }

  .text-muted {
    color: #666;
  }

  .info-section {
    border: 1px solid #03A9F4;
    border-radius: 2px;
    background-color: #E1F5FE;
    padding: 6px;
  }
</style>

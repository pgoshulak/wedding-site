<template>
  <div id="rsvp">
    <h3 class="md-display-1">RSVP</h3>
    
    <md-empty-state v-if="searchResults.length==0" 
      md-icon="search" md-label="Please enter your Postal/Zip code" md-description="Your postal/zip code is used to enter your RSVP">
      <md-field>
        <label>Postal/Zip Code</label>
        <md-input v-model="postCodeSearch" @keyup.enter="searchPostCode"></md-input>
      </md-field>
    </md-empty-state>

    <div v-if="searchResults.length">
      <rsvp-entry v-for="result in searchResults" 
        :key="result.id" 
        :result="result" 
        :db="db"
        @newUnsavedChange="addUnsavedChange"
        @saveChanges="saveChanges"
        ></rsvp-entry>
    </div>

    <md-dialog :md-active.sync="showDialogDiscardChanges">
      <md-dialog-title>You have unsaved changes!</md-dialog-title>
      <md-dialog-content>You have unsaved changes! Discard or continue editing?</md-dialog-content>
      <md-dialog-actions>
        <md-button @click="navDiscardChanges">Discard Changes</md-button>
        <md-button class="md-accent md-raised" @click="navContinueEditing">Continue Editing</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import {apiKey as API_KEY} from '../../../service/firebase.js'
import * as firebase from 'firebase'
import 'firebase/firestore'
import RsvpEntry from './RsvpEntry'

export default {
  name: 'Home',
  data () {
    return {
      db: null,
      postCodeSearch: '',
      searchResults: [],
      unsavedChanges: [],
      showDialogDiscardChanges: false,
      nextNavRouteFcn: null
    }
  },
  computed: {
    postCodeSearchClean () {
      return this.postCodeSearch.toLowerCase().replace(/ /g, '')
    }
  },
  methods: {
    searchPostCode () {
      this.searchResults = []
      let guestsRef = this.db.collection('guests')
      guestsRef.where('postcode', '==', this.postCodeSearchClean)
        .get().then((snap) => {
          snap.forEach((docRef) => {
            this.searchResults.push({
              id: docRef.id,
              data: docRef.data()
            })
          })
        }).catch((err) => {
          console.log('Error searching for ' + this.postCodeSearch, err)
        })
    },
    addUnsavedChange (guestId) {
      // Register an unsaved change for the associated GuestId (add to running tally of unsaved changes)
      if (!this.unsavedChanges.includes(guestId)) {
        this.unsavedChanges.push(guestId)
      }
    },
    saveChanges (guestId) {
      // Register that the GuestId has been saved
      let index = this.unsavedChanges.indexOf(guestId)
      this.unsavedChanges.splice(index, 1)
    },
    navContinueEditing () {
      // Clear 'next' route
      this.nextNavRouteFcn = null
      this.showDialogDiscardChanges = false
    },
    navDiscardChanges () {
      // Go to 'next' route
      this.nextNavRouteFcn()
      this.showDialogDiscardChanges = false
    }
  },
  created () {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: API_KEY,
        authDomain: 'peeph-wedding.firebaseapp.com',
        projectId: 'peeph-wedding'
      })
    }
    this.db = firebase.firestore()
  },
  components: {
    RsvpEntry
  },
  beforeRouteLeave (to, from, next) {
    if (this.unsavedChanges.length === 0) {
      next()
    } else {
      // Store 'next' route
      this.nextNavRouteFcn = next
      // Show dialog
      this.showDialogDiscardChanges = true
      /* const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      if (answer) {
        next()
      } else {
        next(false)
      } */
    }
  }
}
</script>

<style scoped>
.md-empty-state {
  padding-top: 0px;
}
h3 {
  margin-bottom: 16px
}
</style>
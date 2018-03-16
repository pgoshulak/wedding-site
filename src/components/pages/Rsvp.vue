<template>
  <div id="rsvp">
    <h3 class="md-display-1">RSVP</h3>

    <!-- Initial state, no search results -->
    <md-empty-state v-if="searchResults.length==0" 
      md-icon="search" 
      md-label="Please enter your secret phrase" 
      md-description="You will be able to RSVP for yourself and all your guests">
      <md-field>
        <label>Secret Phrase</label>
        <md-input id="passwordSearchInput" v-model="passwordSearch" @keyup.enter="searchPassword"></md-input>
      </md-field>
      <md-button id="btnSearchPassword" class="md-primary md-raised" @click="searchPassword">Search!</md-button>
    </md-empty-state>

    <!-- Search results -->
    <div v-if="searchResults.length">
      <p>{{searchResults.length}} guest(s) found for {{passwordSearch}}</p>
      <rsvp-entry v-for="result in searchResults" 
        :key="result.id" 
        :result="result" 
        :db="db"
        @newUnsavedChange="addUnsavedChange"
        @saveChanges="saveChanges"
        ></rsvp-entry>
    </div>

    <!-- Dialog for route-guard against leaving unsaved changes -->
    <md-dialog :md-active.sync="showDialogDiscardChanges">
      <md-dialog-title>You have unsaved changes!</md-dialog-title>
      <md-dialog-content>You have unsaved changes! Discard or continue editing?</md-dialog-content>
      <md-dialog-actions>
        <md-button @click="navDiscardChanges">Discard Changes</md-button>
        <md-button class="md-accent md-raised" @click="navContinueEditing">Continue Editing</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- Snackbar popup for 'no results found' -->
    <md-snackbar :md-duration="4000" :md-active.sync="showSnackbarNoResults" md-persistent>
      No results found for {{passwordSearch}}. Make sure you typed it correctly!
      <md-button class="md-primary" @click="showSnackbarNoResults = false">Dismiss</md-button>
    </md-snackbar>
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
      passwordSearch: '',
      searchResults: [],
      unsavedChanges: [],
      showDialogDiscardChanges: false,
      showSnackbarNoResults: false,
      nextNavRouteFcn: null
    }
  },
  computed: {
    passwordSearchClean () {
      return this.passwordSearch.toLowerCase().replace(/ /g, '')
    }
  },
  methods: {
    searchPassword () {
      this.searchResults = []
      let guestsRef = this.db.collection('guests')
      guestsRef.where('password', '==', this.passwordSearchClean)
        .get().then((snap) => {
          if (snap.empty) {
            this.showSnackbarNoResults = true
          }
          snap.forEach((docRef) => {
            this.searchResults.push({
              id: docRef.id,
              data: docRef.data()
            })
          })
        }).catch((err) => {
          console.log('Error searching for ' + this.passwordSearch, err)
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
  mounted () {
    document.getElementById('passwordSearchInput').scrollIntoView()
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
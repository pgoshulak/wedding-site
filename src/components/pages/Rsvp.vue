<template>
  <div id="rsvp">
    <h3 class="md-display-1">RSVP</h3>
    <!-- <h4 class="md-subheading" v-if="searchResults.length==0">Please enter your Postal/Zip code</h4> -->
    <md-empty-state v-if="searchResults.length==0" 
      md-icon="search" md-label="Please enter your Postal/Zip code" md-description="Your postal/zip code is used to enter your RSVP">
      <md-field>
        <label>Postal/Zip Code</label>
        <md-input v-model="postCodeSearch" @keyup.enter="searchPostCode"></md-input>
      </md-field>
    </md-empty-state>
    <div v-if="searchResults.length">
      <rsvp-entry v-for="result in searchResults" :key="result.id" :result="result" :db="db"></rsvp-entry>
    </div>
  </div>
</template>

<script>
// import db from '../../../service/firebase.js'
import * as firebase from 'firebase'
import 'firebase/firestore'
import RsvpEntry from './RsvpEntry'

export default {
  name: 'Home',
  data () {
    return {
      db: null,
      postCodeSearch: '',
      searchResults: []
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
    }
  },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAYI6g6LhzhqAQVnRxCyzoz_N-aWVh45xw',
      authDomain: 'peeph-wedding.firebaseapp.com',
      projectId: 'peeph-wedding'
    })
    this.db = firebase.firestore()
  },
  components: {
    RsvpEntry
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
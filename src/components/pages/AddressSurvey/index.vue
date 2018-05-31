<template>
  <div id="home">
    <h3 class="md-display-1">Address Survey</h3>
    <SearchArea v-if="searchResults.length==0" @submitSearch="submitSearch"></SearchArea>
    <pre>{{searchResults}}</pre>
  </div>
</template>

<script>
  import {apiKey as API_KEY} from '../../../../service/firebase.js'
  import * as firebase from 'firebase'
  import 'firebase/firestore'
  import SearchArea from './SearchArea'
  export default {
    data () {
      return {
        db: null,
        guestsRef: null,
        searchTerm: '',
        searchResults: [],
        showSnackbarNoResults: false
      }
    },
    methods: {
      submitSearch (searchTerm) {
        // console.log(data)
        this.guestsRef = this.guestsRef || this.db.collection('guests')
        this.searchTerm = searchTerm
        this.searchResults = []
        this.guestsRef.where('email', '==', searchTerm).get()
          .then(snap => {
            if (snap.empty) {
              this.showSnackbarNoResults = true
            }
            snap.forEach(docRef => {
              this.searchResults.push({
                id: docRef.id,
                data: docRef.data()
              })
            })
          }).catch(err => {
            console.error('Error searching for ' + searchTerm, err)
          })
      }
    },
    created () {
      console.log('inside created()')
      console.log(firebase)
      if (!firebase.apps.length) {
        console.log('initializing firebase')
        firebase.initializeApp({
          apiKey: API_KEY,
          authDomain: 'peeph-wedding.firebaseapp.com',
          projectId: 'peeph-wedding'
        })
      }
      console.log('setting this.db = firebase.firestore()')
      this.db = firebase.firestore().settings({
        timestampsInSnapshots: true
      })
    },
    components: {
      SearchArea
    }
  }
</script>

<style scoped>

</style>
<template>
  <div id="home">
    <h3 class="md-display-1">Address Survey</h3>
    <SearchArea v-if="searchResults.length==0" @submitSearch="submitSearch"></SearchArea>
    <pre>{{searchResults}}</pre>
  </div>
</template>

<script>
  import { db } from '../../../main.js'
  import SearchArea from './SearchArea'
  export default {
    data () {
      return {
        guestsRef: null,
        searchTerm: '',
        searchResults: [],
        showSnackbarNoResults: false
      }
    },
    methods: {
      submitSearch (searchTerm) {
        // console.log(data)
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
      this.guestsRef = db.collection('guests')
    },
    components: {
      SearchArea
    }
  }
</script>

<style scoped>

</style>
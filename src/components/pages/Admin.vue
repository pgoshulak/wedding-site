<template>
  <div>
    <h3 class="md-display-1 ">Admin page</h3>
    <md-progress-spinner class="md-accent"  v-if="loading" md-mode="indeterminate"></md-progress-spinner>

    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h4 class="md-title">Users</h4>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state md-label="No guests found" md-description="No guests found by that name :(" md-icon="sentiment_very_dissatisfied"></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{item.data.name}}</md-table-cell>
        <md-table-cell md-label="Password" md-sort-by="password">{{item.data.password}}</md-table-cell>
        <md-table-cell md-label="RSVP" md-sort-by="rsvp">{{item.data.rsvp}}</md-table-cell>
        <md-table-cell md-label="Food" md-sort-by="food">{{item.data.food}}</md-table-cell>
        <md-table-cell md-label="Restrictions" md-sort-by="restrictions">{{item.data.restrictions}}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{item.data.email}}</md-table-cell>
        <md-table-cell md-label="Song" md-sort-by="song">{{item.data.song}}</md-table-cell>
        <md-table-cell md-label="Comment" md-sort-by="comment">{{item.data.comment}}</md-table-cell>
      </md-table-row>
    </md-table>

    <pre v-if="!loading">{{allGuests}}</pre>
  </div>
</template>

<script>
import {apiKey as API_KEY} from '../../../service/firebase.js'
import * as firebase from 'firebase'
import 'firebase/firestore'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.data.name).includes(toLower(term)))
  }
  return items
}

export default {
  name: 'Admin',
  data () {
    return {
      allGuests: [],
      searched: [],
      search: '',
      loading: false
    }
  },
  methods: {
    queryAllGuests () {
      this.loading = true
      let guestsRef = this.db.collection('guests')
      guestsRef.get().then((querySnap) => {
        querySnap.forEach((docRef) => {
          this.allGuests.push({
            id: docRef.id,
            data: docRef.data()
          })
        })
        this.searched = this.allGuests
        this.loading = false
      }).catch((err) => {
        console.error(err)
        this.loading = false
      })
    },
    searchOnTable () {
      this.searched = searchByName(this.allGuests, this.search)
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
    this.queryAllGuests()
  }
}
</script>

<style scoped>

</style>
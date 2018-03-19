<template>
  <div id="home">
    <h3 class="md-display-1">Photo Gallery</h3>
    <img :src="photo.thumbUrl" :key="photo.uploaded" alt="image" v-for="photo in photoList">
  </div>
</template>

<script>
  import {apiKey as API_KEY} from '../../../service/firebase.js'
  import firebase from 'firebase'
  import 'firebase/firestore'

  export default {
    name: 'Photos',
    data () {
      return {
        // db: null,
        photoList: []
      }
    },
    methods: {
      getPhotos (db) {
        let photos = []
        db.collection('photos').get().then((snap) => {
          snap.forEach((doc) => {
            photos.push(doc.data())
          })
        })
        return photos
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
      let db = firebase.firestore()
      this.photoList = this.getPhotos(db)
    }
  }
</script>

<style>

</style>
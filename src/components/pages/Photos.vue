<template>
  <div id="home">
    <h3 class="md-display-1">Photo Gallery</h3>
    <!-- <img :src="photo.thumbUrl" :key="photo.uploaded" alt="image" v-for="photo in photoList"> -->
    <div class="thumbnail" v-for="(photo, index) in photoList" :key="index">
      <img :alt="photo.caption" v-lazy="photo.thumb" @click="openLightbox(index)">
    </div>
    <lightbox id="lightbox" ref="lightbox" :images="photoList" :showLightBox="false" :showCaption="true" :showThumbs="true"></lightbox>
  </div>
</template>

<script>
  import {apiKey as API_KEY} from '../../../service/firebase.js'
  import firebase from 'firebase'
  import 'firebase/firestore'
  import Lightbox from '../../../node_modules/vue-image-lightbox'

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
            let photoData = doc.data()
            photos.push({
              thumb: photoData.thumbUrl,
              src: photoData.fullUrl,
              caption: photoData.uploaded.toString()
            })
          })
        })
        return photos
      },
      openLightbox (index) {
        this.$refs.lightbox.showImage(index)
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
    },
    components: {
      Lightbox
    }
  }
</script>

<style lang="scss">

.vue-lb-container {
    z-index: 5;
}
.thumbnail {
  cursor: pointer;
  display:inline;
  margin: 4px;
}
</style>
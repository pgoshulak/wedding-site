<template>
  <div id="home">
    <h3 class="md-display-1">Photo Gallery</h3>
    <div id="thumbnails">
      <div class="thumbnail" v-for="(photo, index) in photoList" :key="index">
        <img :alt="photo.caption" v-lazy="photo.thumb" @click="openLightbox(index)">
      </div>
    </div>
    <lightbox id="lightbox" ref="lightbox" :images="photoList" :showLightBox="false" :showCaption="true" :showThumbs="true"></lightbox>
  </div>
</template>

<script>
  import { db } from '../../main.js'
  import Lightbox from '../../../node_modules/vue-image-lightbox'

  export default {
    name: 'Photos',
    data () {
      return {
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

#thumbnails {
  // https://medium.com/samsung-internet-dev/common-responsive-layouts-with-css-grid-and-some-without-245a862f48df
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))
}

.thumbnail {
  cursor: pointer;
  margin: 4px;
  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
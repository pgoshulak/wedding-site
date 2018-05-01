<template>
  <div id="home">
    <h3 class="md-display-1">Location</h3>
    <p>Steph and Peter will be married at <em>Earth to Table: The Farm </em>
      <a :href="directionsHref" target="_blank">(Directions)</a>
      , near Hamilton ON.</p>
    <p>The ceremony begins at 4:00pm, with reception and dinner to follow</p>
    <iframe :src="src" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script>
  import {apiKey as API_KEY} from '../../../service/firebase.js'
  const MAP_QUERY = `Earth%20to%20Table%3A%20The%20Farm%2C%20Millgrove%20ON`
  const MAP_ZOOM = 11
  export default {
    name: 'Location',
    computed: {
      src () { return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${MAP_QUERY}&zoom=${MAP_ZOOM}` },
      directionsHref () { return `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}` }
    },
    created () {
      console.log(API_KEY)
    }
  }
</script>

<style>
iframe {
  width: 100%;
  min-height: 400px;
  border: 0
}
a {
  font-weight: bold;
}
</style>
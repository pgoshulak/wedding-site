<template>
  <div id="location">
    <h3 class="md-display-1">Location</h3>
    <p>Steph and Peter will be married at <em>Earth to Table: The Farm </em>
      <a :href="directionsHref" target="_blank">(directions)</a>
      , near Hamilton ON.</p>
    <p>The outdoor ceremony begins at 4:00pm, with indoor reception and dinner to follow. Dress code is semi-formal.</p>

    <h3 class="md-display-1">Accomodations</h3>
    <p>We have reserved room blocks at the following hotels in nearby Hamilton. Please ask for Barraco/Goshulak wedding:</p>
    <ul>
      <li><a href="http://www.visitorsinn.com/">Visitors Inn</a></li>
      <li><a href="https://carmenshotel.com/">Carmen's Best Western</a></li>
      <li><a href="http://www.sheratonhamilton.com/?SWAQ=958P">Sheraton Hamilton</a></li>
    </ul>
    
    <iframe :src="src" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script>
  import { firebaseConfig } from '../../../secrets.js'
  const API_KEY = firebaseConfig.apiKey
  // import {apiKey as API_KEY} from '../../../service/firebase.js'
  const MAP_QUERY = `Earth%20to%20Table%3A%20The%20Farm%2C%20Millgrove%20ON`
  const MAP_ZOOM = 11
  export default {
    name: 'Location',
    computed: {
      src () { return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${MAP_QUERY}&zoom=${MAP_ZOOM}` },
      directionsHref () { return `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}` }
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
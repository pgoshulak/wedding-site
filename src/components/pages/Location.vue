<template>
  <div id="location">
    <h3 class="md-display-2">Location</h3>

    <div id="farm-entrance">
      <img src="../../assets/farm_xxs.jpg" alt="Earth to Table: The Farm">
    </div>

    <h5 class="md-title">Earth to Table: The Farm</h5>
    <a :href="directionsHref" target="_blank">250 Concession 4 W, Millgrove, ON L8B 1J3</a> (just north of Hamilton)

    <p>The outdoor ceremony begins at 4:30pm, with indoor reception and dinner to follow. Dress code is semi-formal.</p>

    <h5 class="md-title">Accomodations</h5>
    <p>We have reserved room blocks at the following hotels in nearby Hamilton. Please ask for Barraco/Goshulak wedding:</p>
    <ul>
      <li><a href="http://www.visitorsinn.com/">Visitors Inn</a></li>
      <li><a href="https://carmenshotel.com/">Carmen's Best Western</a></li>
      <li><a href="http://www.sheratonhamilton.com/?SWAQ=958P">Sheraton Hamilton</a></li>
    </ul>

    <h5 class="md-title">Transportation</h5>
    <p>We have buses doing one pick up and several drop-offs at each hotel:</p>
    <ul>
      <li>Carmen's: 3:40</li>
      <li>Visitor's Inn: between 3:40 and 3:55</li>
      <li>Sheraton: between 3:40 and 3:55</li>
    </ul>

    <p>Departure times from the Farm will also be confirmed once we know how many people need to get to each hotel. 
      Please make arrangements for safe and sober rides, whether it's with the buses on on your own. 
      Note that Ubers and Taxis know where the Farm is so those are also options.</p>
    <p>You CAN leave your vehicle at the Farm overnight, and pick it up by 11 am the next day</p>

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

<style lang="scss">
iframe {
  width: 100%;
  min-height: 400px;
  border: 0
}
a {
  font-weight: bold;
}
div#farm-entrance {
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  @media screen and (min-width: 600px) {
    float: right;
    margin: 0px 20px 20px;
  }

  & > img {
      display: block;
      margin: 8px auto;
    }
}
</style>

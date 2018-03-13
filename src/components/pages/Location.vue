<template>
  <div id="home">
    <h3 class="md-display-1">Location</h3>
    <p>Steph and Peter will be married at <em>Earth to Table: The Farm</em>, near Hamilton ON.</p>
    <p>The ceremony begins at 4:00pm, with reception and dinner to follow</p>
    <iframe :src="src" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script>
  const API_KEY = 'AIzaSyAYI6g6LhzhqAQVnRxCyzoz_N-aWVh45xw'
  const MAP_QUERY = `Earth+to+Table+The+Farm,Millgrove+ON`
  const MAP_ZOOM = 11
  export default {
    name: 'Location',
    computed: {
      src () { return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${MAP_QUERY}&zoom=${MAP_ZOOM}` }
    }
  }
</script>

<style>
iframe {
  width: 100%;
  min-height: 400px;
  border: 0
}
</style>
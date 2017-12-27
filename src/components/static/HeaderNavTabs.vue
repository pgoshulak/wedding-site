<template>
  <div id="header-toolbar">
    <md-tabs class="md-primary" md-sync-route md-alignment="right">
      <!-- <md-tab id="tab-home" md-label="Home" to="/"></md-tab>
      <md-tab id="tab-our-story" md-label="Our Story" to="our-story"></md-tab>
      <md-tab id="tab-location" md-label="Location" to="location"></md-tab>
      <md-tab id="tab-accommodations" md-label="Accommodations" to="accommodations"></md-tab>
      <md-tab id="tab-rsvp" md-label="RSVP" to="rsvp"></md-tab> -->
      <md-tab v-for="link in links" 
        :key="link.id" 
        :id="link.id" 
        :md-label="link.label" 
        :to="link.to"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
  export default {
    name: 'HeaderNavTabs',
    props: ['links']
  }
</script>

<style scoped>

</style>
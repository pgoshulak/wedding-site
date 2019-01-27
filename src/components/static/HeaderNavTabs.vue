<template>
  <div id="header-toolbar">
    <md-tabs class="md-primary" md-sync-route md-alignment="right" md-elevation="1">
      <!-- <md-tab id="tab-home" md-label="Home" to="/"></md-tab>
      <md-tab id="tab-our-story" md-label="Our Story" to="our-story"></md-tab>
      <md-tab id="tab-location" md-label="Location" to="location"></md-tab>
      <md-tab id="tab-accommodations" md-label="Accommodations" to="accommodations"></md-tab>
      <md-tab id="tab-rsvp" md-label="RSVP" to="rsvp"></md-tab> -->
      <div v-for="link in links" :key="link.id">

        <md-tab
          v-if="link.to"
          :id="link.id"
          :md-label="link.label"
          :to="link.to"
        ></md-tab>
        <md-tab
          v-else-if="link.emit"
          :id="link.id"
          :md-label="link.label"
          @click="$emit(link.emit)"
        ></md-tab>
      </div>
      </md-tabs>
  </div>
</template>

<script>
  export default {
    name: 'HeaderNavTabs',
    props: ['links']
  }
</script>

<style>
.md-tabs-indicator {
  display: none;
}
</style>

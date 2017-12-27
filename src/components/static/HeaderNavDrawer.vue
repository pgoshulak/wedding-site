<template>
  <div>
    <md-button id="nav-drawer-button" class="md-raised md-primary md-icon-button" @click="drawerOpen = !drawerOpen">
      <md-icon>menu</md-icon>
    </md-button>

    <md-drawer class="md-right" :md-active.sync="drawerOpen">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Menu</span>
      </md-toolbar>

      <md-list>
        <md-list-item v-for="link in links" :key="link.id" :to="link.to">
          <span class="md-list-item-text">{{link.label}}</span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
  export default {
    name: 'HeaderNavDrawer',
    props: { links: [] },
    data () {
      return {
        drawerOpen: false
      }
    }
  }
</script>

<style scoped>
#nav-drawer-button {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 999 !important;
}
</style>
<template>
  <div>
    <md-menu>
      <md-button id="nav-drawer-button" class="md-raised md-primary md-icon-button" md-menu-trigger>
        <md-icon>menu</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item v-for="link in links" :key="link.id" :to="link.to">
          <span class="md-list-item-text">{{link.label}}</span>
        </md-menu-item>
      </md-menu-content>

    </md-menu>
  </div>
</template>

<script>
  export default {
    name: 'HeaderNavDrawer',
    props: { links: [] }
  }
</script>

<style scoped>
#nav-drawer-button {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 999 !important;
}
.md-menu-content {
  max-height: 75%;
}
</style>
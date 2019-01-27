<template>
  <div id="app">
    <header>
    </header>

    <main class="md-layout">
      <div class="spacer md-layout-item md-xsmall-hide"></div>
      <md-content class="md-layout-item md-size-70 md-large-size-70 md-medium-size-80 md-small-size-90 md-xsmall-size-100">
        <banner-image></banner-image>

        <header-nav id="header-nav" @showRegistry="showRegistry = true"></header-nav>
        <div id="router-view-container">
          <router-view></router-view>
        </div>

        <md-dialog
          :md-active.sync="showRegistry"
          :md-backdrop="true"
          :md-close-on-esc="true"
          :md-click-outside-to-close="true"
          :md-fullscreen="true"
          class="searchDialog"
          >
          <md-dialog-content>
            <Registry></Registry>
            <md-button @click="showRegistry = false" style="float:right">close</md-button>
          </md-dialog-content>
        </md-dialog>
    <PageFooter />
      </md-content>
      <div class="spacer md-layout-item md-xsmall-hide"></div>
    </main>

  </div>
</template>

<script>
import BannerImage from './components/static/BannerImage.vue'
import HeaderNav from './components/static/HeaderNav.vue'
import PageFooter from './components/static/PageFooter.vue'
import Registry from './components/pages/Registry.vue'
export default {
  name: 'app',
  components: {
    BannerImage,
    HeaderNav,
    PageFooter,
    Registry
  },
  data () {
    return {
      showRegistry: false
    }
  }
}
</script>

<style lang="scss">
@import "style.scss";

body {
  background-color: $background;
  overflow-x: hidden;
}
input {
  /* Prevent Safari from auto-zoom on input select */
  font-size: initial !important;
}
#router-view-container {
  padding: 4px 4px 50px;
}
main {
  min-height: 100vh
}

#header-nav {
  position: sticky;
  top: -1px;
}

.searchDialog {
  z-index: 13;
}

</style>

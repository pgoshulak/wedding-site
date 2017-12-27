<template>
  <div id="app">
    <header>
    </header>

    <main class="md-layout">
      <div class="spacer md-layout-item md-xsmall-hide"></div>
      <md-content class="md-layout-item md-size-70 md-large-size-70 md-medium-size-80 md-small-size-90 md-xsmall-size-100">
        <!--<div id="header-img">
          <img src="./assets/hug375.jpg" alt="hug image">
        </div> -->
        <banner-image></banner-image>

        <header-nav></header-nav>

        <router-view></router-view>
      </md-content>
      <div class="spacer md-layout-item md-xsmall-hide"></div>
    </main>
  </div>
</template>

<script>
import BannerImage from './components/static/BannerImage.vue'
import HeaderNav from './components/static/HeaderNav.vue'
export default {
  name: 'app',
  components: {
    BannerImage,
    HeaderNav
  }
}
</script>

<style lang="scss">
@import "style.scss";

body {
  background-color: $background;
  overflow-x: hidden;
}

#header-img {
  display: block;
  margin: auto;
  width: 200px;
  height: 200px;
  img {
    border-radius: 50%;
    border: 15px solid $accent;
  }
}

</style>

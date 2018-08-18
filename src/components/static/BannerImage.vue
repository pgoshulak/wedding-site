<template>
  <div id="banner-image">
    <img :class="nodeEnv" src="../../assets/banner.jpg" alt="banner image">
    <div id="title-text" class="md-display-2">Steph &amp; Peter</div>
    <a id="caption-text" class="md-caption" target="_blank" href="https://www.instagram.com/jasonsuperchan/">@jasonsuperchan</a>
  </div>
</template>

<script>
  export default {
    name: 'BannerImage',
    data () {
      return {
        nodeEnv: process.env.NODE_ENV
      }
    }
  }
</script>

<style scoped lang="scss">
#banner-image {
  width: 100%;
  height: 0px;
  padding-top: 30%;
  // padding-bottom: 53%;
  position: relative;
  overflow: hidden;
}
img {
  position: absolute;
  object-fit: cover;
  top: -60%;
  width: 100%;
  /* &.development {
    filter: blur(15px);
  } */
}
#title-text {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  opacity: 0.9;
}
#caption-text {
  position: absolute;
  bottom: 6px;
  right: 6px;
  color: white;
  opacity: 0.5;
}
</style>
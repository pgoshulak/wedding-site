<template>
  <div id="banner-image">
    <img src="../../assets/banner.jpg" alt="banner image">
    <div id="title-text" class="md-display-2">Steph &amp; Peter</div>
  </div>
</template>

<script>
  export default {
    name: 'BannerImage'
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
  width: 100%
}
#title-text {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  opacity: 0.9;
}
</style>
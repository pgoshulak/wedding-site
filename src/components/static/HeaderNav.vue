<template>
  <div id="header-nav">
    <header-nav-tabs id="header-nav-tabs" :links="links" @showRegistry="$emit('showRegistry')"></header-nav-tabs>
    <!-- <header-nav-drawer id="header-nav-drawer" :links="links"></header-nav-drawer> -->
    <header-nav-menu id="header-nav-menu" :links="links" @showRegistry="$emit('showRegistry')"></header-nav-menu>

  </div>
</template>

<script>
import HeaderNavTabs from './HeaderNavTabs'
import HeaderNavMenu from './HeaderNavMenu'
export default {
  name: 'HeaderNav',
  data () {
    return {
      links: [
        {
          id: 'home-link',
          label: 'RSVP',
          to: '/'
        },
        {
          id: 'our-story-link',
          label: 'Our Story',
          to: '/#our-story'
        },
        {
          id: 'location-link',
          label: 'Location',
          to: '/#location'
        },
        {
          id: 'photos-link',
          label: 'Photos',
          to: '/#photos'
        },
        {
          id: 'registry-link',
          label: 'Registry',
          emit: 'showRegistry'
        }
      ]
    }
  },
  components: {
    HeaderNavTabs,
    HeaderNavMenu
  }
}
</script>

<style lang="scss">

#header-nav {
  z-index: 6;
}

$small-breakpoint: 960px;

// Small screens
@media screen and (min-width: 0px) and (max-width: $small-breakpoint) {
  #header-nav-menu { display: initial; }
  #header-nav-tabs { display: none; }
}
// Large screens
@media screen and (min-width: $small-breakpoint+1) and (max-width: 9999px) {
  #header-nav-menu { display: none; }
  #header-nav-tabs { display: initial; }
}
</style>

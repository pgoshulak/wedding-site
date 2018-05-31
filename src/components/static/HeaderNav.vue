<template>
  <div id="header-nav">
    <header-nav-tabs id="header-nav-tabs" :links="links"></header-nav-tabs>
    <!-- <header-nav-drawer id="header-nav-drawer" :links="links"></header-nav-drawer> -->
    <header-nav-menu id="header-nav-menu" :links="links"></header-nav-menu>
    
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
          id: 'home',
          label: 'Home',
          to: '/'
        },
        {
          id: 'address-survey',
          label: 'Address Survey',
          to: 'address-survey'
        },
        {
          id: 'our-story',
          label: 'Our Story',
          to: '/our-story'
        },
        {
          id: 'location',
          label: 'Location',
          to: 'location'
        },
        {
          id: 'accommodations',
          label: 'Accomodations',
          to: 'accommodations'
        },
        {
          id: 'registry',
          label: 'Registry',
          to: 'registry'
        },
        {
          id: 'photos',
          label: 'Photos',
          to: 'photos'
        },
        {
          id: 'admin',
          label: 'Admin',
          to: 'admin'
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
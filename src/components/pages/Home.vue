<template>
  <div id="home">
    <h3 class="md-display-2">Save the Date</h3>
    <h3 class="md-title main-date">Saturday June 1, 2019 at 4:00pm <br/> <small>Hamilton, ON</small></h3>
    <!-- <Countdown></Countdown> -->
    <AddToCalendar class="block-centered" mountElem="add-to-calendar-home" />

    <section id="address-survey">
      <p>We're very excited to celebrate our wedding with you! Please tell us where to send your invitation:</p>
      <div id="address-survey-button-container">
        <md-button id="address-survey-button" class="md-primary md-raised" @click="showAddressSurvey=true">
          <md-icon>mail</md-icon>
          Submit Address
        </md-button>
      </div>
    </section>

    <section id="our-story">
      <OurStory></OurStory>
    </section>

    <section id="location">
      <Location></Location>
    </section>

    <section id="photos">
      <Photos></Photos>
    </section>



    <md-dialog
      :md-active.sync="showAddressSurvey"
      :md-backdrop="true"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
      :md-fullscreen="true"
      >
      <md-dialog-content>
        <AddressSurvey @closeAddressSurvey="showAddressSurvey=false"></AddressSurvey>
      </md-dialog-content>
    </md-dialog>

  </div>
</template>

<script>
  // import AddressSurvey from './AddressSurvey'
  import Countdown from '../misc/Countdown'
  import AddToCalendar from '../misc/AddToCalendar'
  // import Photos from './Photos'
  // import Location from './Location'
  // import OurStory from './OurStory'
  const OurStory = () => import('@/components/pages/OurStory' /* webpackChunkName: "chunk-our-story" */)
  const Location = () => import('@/components/pages/Location' /* webpackChunkName: "chunk-location" */)
  const AddressSurvey = () => import('@/components/pages/AddressSurvey' /* webpackChunkName: "chunk-address-survey" */)
  const Photos = () => import('@/components/pages/Photos' /* webpackChunkName: "chunk-photos" */)

  export default {
    name: 'Home',
    data () {
      return {
        showAddressSurvey: false
      }
    },
    components: {
      Countdown,
      AddToCalendar,
      AddressSurvey,
      Photos,
      Location,
      OurStory
    },
    created () {
      if (!document.cookie.includes('remember')) {
        console.log('/mystery')
      }
    }
  }
</script>

<style lang="scss">

section {
  margin-bottom: 80px;
}
.block-centered {
  margin: auto;
  display: block;
  width: 150px
}
h3.main-date {
  text-align: center;
}
h3.md-display-2 {
  text-align: center;

  @media screen and (min-width: 600px) {
    &::before, &::after {
      display: inline-block;
      content: '';
      border-top: 1px solid rgba(0,0,0,0.5);
      width: 100px;
      margin: 0 20px;
      transform: translateY(-1rem)
    }
  }
  @media screen and (max-width: 599px) {
    border-top: 1px solid rgba(0,0,0,0.5);
    border-bottom: 1px solid rgba(0,0,0,0.5);
    line-height: 80px;
  }
}
#address-survey-button-container {
  width: 100%;
  text-align: center;
  & > button {
    max-width: 300px;
    width: 300px;
  }
}

</style>

<template>
  <div id="home">
    <h3 class="md-display-1">Saturday June 1, 2019 4:00pm</h3>
    <Countdown></Countdown>

    <section id="address-survey">
      <md-button class="md-primary" @click="showAddressSurvey=true">Submit Address</md-button>
    </section>

    <section id="our-story">
      <OurStory></OurStory>
    </section>

    <section id="Location">
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
  import AddressSurvey from './AddressSurvey'
  import Countdown from '../misc/Countdown'
  import Photos from './Photos'
  import Location from './Location'
  import OurStory from './OurStory'
  export default {
    name: 'Home',
    data () {
      return {
        showAddressSurvey: false
      }
    },
    components: {
      Countdown,
      AddressSurvey,
      Photos,
      Location,
      OurStory
    }
  }
</script>

<style>

section {
  margin-bottom: 80px;
}

</style>
<template>
  <div id="home">
    <h3 class="md-display-1">Saturday June 1, 2019 4:00pm</h3>
    <Countdown></Countdown>
    <md-button class="md-primary" @click="showAddressSurvey=true">Submit Address</md-button>

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
  export default {
    name: 'Home',
    data () {
      return {
        showAddressSurvey: false
      }
    },
    components: {
      Countdown,
      AddressSurvey
    }
  }
</script>

<style>

</style>
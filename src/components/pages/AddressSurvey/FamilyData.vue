<template>
  <div>
    <p>{{ infoRequestMessage }}</p>
    <md-button class="md-raised" v-if="!showAddressForm" @click="showAddressForm = true">Update Address</md-button>
    <form v-if="showAddressForm" action="#" autocomplete="on">
      <div class="md-layout md-gutter md-alignment-center-left">

        <div class="md-layout-item md-size-66 md-small-size-100">
          <md-field :md-counter="false">
            <label for="streetAddress">Street Address</label>
            <md-input id="streetAddress" v-model="streetAddress" @change="newFamilyChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-33 md-small-size-50">
          <md-field :md-counter="false">
            <label for="city">City</label>
            <md-input id="city" v-model="city" @change="newFamilyChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-33 md-small-size-50">
          <md-field :md-counter="false">
            <label for="province">Province/State</label>
            <md-input id="province" v-model="province" @change="newFamilyChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-33 md-small-size-50">
          <md-field :md-counter="false">
            <label for="postalCode">Postal/Zip</label>
            <md-input id="postalCode" v-model="postalCode" @change="newFamilyChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-33 md-small-size-50">
          <md-field :md-counter="false">
            <label for="country">Country</label>
            <md-input id="country" v-model="country" @change="newFamilyChange"></md-input>
          </md-field>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { obscureAddress } from './obscureData.js'
  export default {
    props: ['familyId', 'resultData', 'lastSaveRequest'],
    data () {
      return {
        infoRequestMessage: '',
        showAddressForm: false,
        name: '',
        streetAddress: '',
        city: '',
        province: '',
        postalCode: '',
        country: ''
      }
    },
    methods: {
      newFamilyChange (e) {
        // Emit the changed data as key-value, eg. {'city': 'Toronto'}
        // Important to have the input element's id as the same field used in the db
        let changedData = {}
        changedData[e.target.id] = e.target.value
        this.$emit('newFamilyChange', changedData)
      }
    },
    mounted () {
      // If all address data is present, indicate so (without revealing)
      if (this.resultData.streetAddress &&
        this.resultData.city &&
        this.resultData.province &&
        this.resultData.postalCode &&
        this.resultData.country
      ) {
        this.infoRequestMessage = `We already have your address
        as ${obscureAddress(this.resultData.streetAddress)},
        ${obscureAddress(this.resultData.city)}.`
        this.showAddressForm = false
      } else {
        this.showAddressForm = true
      }
    }
  }
</script>

<style scoped>

</style>

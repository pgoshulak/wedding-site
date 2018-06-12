<template>
  <div>
    <form action="#" autocomplete="on">
      <div class="md-layout md-gutter md-alignment-center-left">

        <div class="md-layout-item md-size-66 md-xsmall-size-100">
          <md-field :md-counter="false">
            <label for="streetAddress">Street Address</label>
            <md-input id="streetAddress" v-model="streetAddress" @change="newFamilyChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-33 md-xsmall-size-50">
          <md-field :md-counter="false">
            <label for="city">City</label>
            <md-input id="city" v-model="city" @change="newFamilyChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-33 md-xsmall-size-50">
          <md-field :md-counter="false">
            <label for="province">Province/State</label>
            <md-input id="province" v-model="province" @change="newFamilyChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-33 md-xsmall-size-50">
          <md-field :md-counter="false">
            <label for="postalCode">Postal/Zip Code</label>
            <md-input id="postalCode" v-model="postalCode" @change="newFamilyChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-33 md-xsmall-size-50">
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
  export default {
    props: ['familyId', 'resultData', 'lastSaveRequest'],
    data () {
      return {
        name: '',
        streetAddress: '',
        city: '',
        province: '',
        postalCode: '',
        country: ''
      }
    },
    methods: {
      populateExistingData () {
        this.name = this.resultData.name || ''
        this.streetAddress = this.resultData.streetAddress || ''
        this.city = this.resultData.city || ''
        this.province = this.resultData.province || ''
        this.postalCode = this.resultData.postalCode || ''
        this.country = this.resultData.country || ''
      },
      newFamilyChange (e) {
        // Emit the changed data as key-value, eg. {'city': 'Toronto'}
        // Important to have the input element's id as the same field used in the db
        let changedData = {}
        changedData[e.target.id] = e.target.value
        this.$emit('newFamilyChange', changedData)
      }
    },
    created () {
      this.populateExistingData()
    }
  }
</script>

<style scoped>

</style>
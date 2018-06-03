<template>
  <div>
    <div class="md-layout md-gutter md-alignment-center-left">
      <form action="#" autocomplete="on">

        <div class="md-layout-item md-size-80 md-xsmall-size-100">
          <md-field :md-counter="false">
            <label for="streetAddress">Street Address</label>
            <md-input id="streetAddress" v-model="streetAddress" @change="registerUnsavedChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-45 md-xsmall-size-100">
          <md-field :md-counter="false">
            <label for="city">City</label>
            <md-input id="city" v-model="city" @change="registerUnsavedChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-45 md-xsmall-size-100">
          <md-field :md-counter="false">
            <label for="province">Province/State</label>
            <md-input id="province" v-model="province" @change="registerUnsavedChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-45 md-xsmall-size-100">
          <md-field :md-counter="false">
            <label for="postalCode">Postal/Zip Code</label>
            <md-input id="postalCode" v-model="postalCode" @change="registerUnsavedChange"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-45 md-xsmall-size-100">
          <md-field :md-counter="false">
            <label for="country">Country</label>
            <md-input id="country" v-model="country" @change="registerUnsavedChange"></md-input>
          </md-field>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['resultData'],
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
      registerUnsavedChange () {
        this.$emit('newUnsavedChange')
      }
    },
    created () {
      this.populateExistingData()
    }
  }
</script>

<style scoped>
  /* FIXME: <form> forces all fields onto separate lines */
  form {
    width: 100%;
    padding: 10px;
  }
  form .md-field {
    margin: 4px 0 8px;
  }
</style>
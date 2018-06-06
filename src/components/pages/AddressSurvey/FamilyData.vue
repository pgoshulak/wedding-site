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
  import { db } from '../../../main.js'
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
      registerUnsavedChange (e) {
        console.log(e.target.id, e.target.value)
        this.$emit('newUnsavedChange')
      },
      saveToDatabase () {
        db.collection('families').doc(this.familyId).set({
          streetAddress: this.streetAddress,
          city: this.city,
          province: this.province,
          postalCode: this.postalCode,
          country: this.country
        }, {merge: true}).then(() => {
          this.$emit('changesSaved')
        }).catch(err => {
          console.error(err)
        })
      }
    },
    watch: {
      lastSaveRequest (val) {
        console.log('FamilyData -> lastSaveRequest at', val)
        this.saveToDatabase()
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
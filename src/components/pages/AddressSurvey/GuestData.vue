<template>
  <div class="guest-data">
    <span class="md-title">{{guest.name}}</span>
    <p>{{ infoRequestMessage }}</p>
    <md-button class="md-raised" v-if="!showEmailPhoneForm" @click="showEmailPhoneForm= true">Update Contact Info</md-button>

    <div v-if="showEmailPhoneForm" class="md-layout md-gutter md-alignment-center-left">
      <div class="md-layout-item md-size-60 md-small-size-100 md-xsmall-size-100">
        <md-field :md-counter="false">
          <label for="email">Email <small>(Optional)</small></label>
          <md-input id="email" v-model="guestEmail" @change="newGuestChange"></md-input>
        </md-field>
      </div>

      <div class="md-layout-item md-size-40 md-small-size-100 md-xsmall-size-100">
        <md-field :md-counter="false">
          <label for="phone">Phone <small>(Optional)</small></label>
          <span class="md-prefix">+1</span>
          <md-input id="phone" type="tel" v-model="guestPhone" @change="newGuestChange" maxlength="10"></md-input>
        </md-field>
      </div>
    </div>

  </div>
</template>

<script>
  import { obscurePhone, obscureEmail } from './obscureData.js'
  export default {
    props: ['guest', 'lastSaveRequest'],
    data () {
      return {
        infoRequestMessage: '',
        showEmailPhoneForm: false,
        guestEmail: '',
        guestPhone: ''
      }
    },
    methods: {
      newGuestChange (e) {
        // Emit the changed data as key-value, eg. {'email': 'user@email.com'}
        // Important to have the input element's id as the same field used in the db
        let changedData = {}
        // Force email to lowercase (weird issue where emails save as 'User@email.com'... smartphone auto-cap?)
        if (e.target.id === 'email') {
          changedData[e.target.id] = e.target.value.toLowerCase()
        } else if (e.target.id === 'phone') {
          // Strip dashes, dots, whitespace from phone numbers
          changedData[e.target.id] = e.target.value.replace(/[-.\s()+]/g, '')
        } else {
          changedData[e.target.id] = e.target.value
        }
        this.$emit('newGuestChange', this.guest.id, changedData)
      }
    },
    mounted () {
      // If all data is present, indicate so (without revealing)
      if (this.guest.email && this.guest.phone) {
        this.infoRequestMessage = `We already have your email (${obscureEmail(this.guest.email)})
        and phone number (${obscurePhone(this.guest.phone)})`
        this.showEmailPhoneForm = false
      } else {
        this.showEmailPhoneForm = true
      }
    }
  }
</script>

<style scoped>
  .guest-data {
    margin-bottom: 20px;
  }
</style>

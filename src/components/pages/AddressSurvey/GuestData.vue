<template>
  <div class="guest-data">
    <span class="md-title">{{guest.name}}</span>
    <md-radio id="rsvp-accept" v-model="guestRSVP" value="ACCEPT" @change="setRsvp" class="md-primary">Attending</md-radio>
    <md-radio id="rsvp-reject" v-model="guestRSVP" value="REJECT" @change="setRsvp" class="md-primary">Not attending</md-radio>
    <md-field v-if="guestRSVP === 'ACCEPT'" :md-counter="false">
      <label for="restrictions">Food restrictions <small>(Optional)</small></label>
      <md-input id="restrictions" v-model="guestRestrictions" @change="newGuestChange" maxlength="64"></md-input>
    </md-field>
    <md-field v-if="guestRSVP === 'ACCEPT'" :md-counter="false">
      <label for="comment">Comment <small>(Only visible to Peter and Steph)</small></label>
      <md-input id="comment" v-model="guestComment" @change="newGuestChange" maxlength="64"></md-input>
    </md-field>

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
        guestPhone: '',
        guestRSVP: this.guest.rsvp || '',
        guestRestrictions: this.guest.restrictions || '',
        guestComment: this.guest.comment || ''
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
      },
      setRsvp (val) {
        this.$emit('newGuestChange', this.guest.id, {rsvp: val})
      }
    },
    mounted () {
      // If all data is present, indicate so (without revealing)
      if (this.guest.rsvp === 'ACCEPT' || this.guest.rsvp === 'REJECT') {
        this.guestRSVP = this.guest.rsvp
      }
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
  .md-radio {
    display: flex;
  }
</style>

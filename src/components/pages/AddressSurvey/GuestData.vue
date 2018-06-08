<template>
  <div>
    <span class="md-title">{{guest.name}}</span>

    <div class="md-layout md-gutter md-alignment-center-left">
      <div class="md-layout-item md-size-40 md-xsmall-size-66">
        <md-field :md-counter="false">
          <label for="guest-email">Email (Optional)</label>
          <md-input id="guest-email" v-model="guestEmail" @change="registerUnsavedChange"></md-input>
        </md-field>
      </div>

      <div class="md-layout-item md-size-25 md-xsmall-size-33">
        <md-field :md-counter="false">
          <label for="guest-phone">Phone (Optional)</label>
          <md-input id="guest-phone" v-model="guestPhone" @change="registerUnsavedChange"></md-input>
        </md-field>
      </div>
    </div>

  </div>
</template>

<script>
  import { db } from '../../../main.js'
  export default {
    props: ['guest', 'lastSaveRequest'],
    data () {
      return {
        guestEmail: '',
        guestPhone: ''
      }
    },
    methods: {
      populateExistingData () {
        this.guestEmail = this.guest.email
        this.guestPhone = this.guest.phone
      },
      registerUnsavedChange (e) {
        console.log(e.target.id, e.target.value)
        this.$emit('newUnsavedChange')
      },
      saveToDatabase () {
        db.collection('guests').doc(this.guest.id).set({
          email: this.guestEmail,
          phone: this.guestPhone
        }, {merge: true}).then(() => {
          this.$emit('changesSaved')
        }).catch(err => {
          console.error(err)
        })
      }
    },
    watch: {
      lastSaveRequest (val) {
        console.log('GuestData -> lastSaveRequest at', val)
        this.saveToDatabase()
      }
    },
    created () {
      this.populateExistingData()
    }
  }
</script>

<style scoped>

</style>
<template>
  <div>
    <span class="md-title">{{guest.name}}</span>

    <div class="md-layout md-gutter md-alignment-center-left">
      <div class="md-layout-item md-size-40 md-xsmall-size-60">
        <md-field :md-counter="false">
          <label for="email">Email <small>(Optional)</small></label>
          <md-input id="email" v-model="guestEmail" @change="newGuestChange"></md-input>
        </md-field>
      </div>

      <div class="md-layout-item md-size-25 md-xsmall-size-40">
        <md-field :md-counter="false">
          <label for="phone">Phone <small>(Optional)</small></label>
          <md-input id="phone" v-model="guestPhone" @change="newGuestChange"></md-input>
        </md-field>
      </div>
    </div>

  </div>
</template>

<script>
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
      newGuestChange (e) {
        // Emit the changed data as key-value, eg. {'email': 'user@email.com'}
        // Important to have the input element's id as the same field used in the db
        let changedData = {}
        changedData[e.target.id] = e.target.value
        this.$emit('newGuestChange', this.guest.id, changedData)
      }
    },
    created () {
      this.populateExistingData()
    }
  }
</script>

<style scoped>

</style>
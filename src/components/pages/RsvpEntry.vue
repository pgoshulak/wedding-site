<template>
  <div>
    <div class="md-layout md-gutter md-alignment-center-left">
      <div class="md-layout-item md-size-100">
        <span class="md-title">{{result.data.name}}</span>
      </div>
      <div class="md-layout-item md-size-25 md-xsmall-size-100">
        <md-radio v-model="rsvp" :value="true" @change="registerUnsavedChange">{{rsvpTextTrue}}</md-radio>
        <md-radio v-model="rsvp" :value="false" @change="registerUnsavedChange">{{rsvpTextFalse}}</md-radio>
      </div>
      <div class="md-layout-item md-size-75 md-xsmall-size-100">
        <md-field :md-counter="false">
          <label>Food Restrictions <small>(optional)</small></label>
          <md-input v-model="restrictions" @change="registerUnsavedChange" maxlength="80"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-50 md-xsmall-size-100">
        <md-field :md-counter="false">
          <label>Email <small>(optional)</small></label>
          <md-input v-model="email" @change="registerUnsavedChange" maxlength="80"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-50 md-xsmall-size-100">
        <md-field :md-counter="false">
          <label>Song request <small>(optional)</small></label>
          <md-input v-model="song" @change="registerUnsavedChange" maxlength="80"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-80 md-xsmall-size-100">
        <md-field :md-counter="false">
          <label>Comment <small>(optional)</small></label>
          <md-input v-model="comment" @change="registerUnsavedChange" maxlength="140"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-20 md-xsmall-size-100">
        <md-button class="md-accent md-raised" :disabled="saved" @click="saveData">save!</md-button>
      </div>
    </div>
    <hr>
    <md-snackbar :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
      {{snackbarMessage}}
      <md-button class="md-primary" @click="showSnackbar = false">Dismiss</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'RsvpEntry',
    props: ['result', 'db'],
    data () {
      return {
        rsvp: null,
        restrictions: '',
        email: '',
        song: '',
        comment: '',
        saved: true,
        showSnackbar: false,
        snackbarMessage: ''
      }
    },
    computed: {
      rsvpTextTrue () {
        if (this.rsvp) {
          return 'Attending :)'
        } else {
          return 'Attending'
        }
      },
      rsvpTextFalse () {
        if (this.rsvp) {
          return 'Not Attending'
        } else {
          return 'Not Attending :('
        }
      }
    },
    methods: {
      saveData () {
        this.db.collection('guests').doc(this.result.id).set({
          rsvp: this.rsvp,
          restrictions: this.restrictions,
          email: this.email,
          song: this.song,
          comment: this.comment,
          timestamp: new Date()
        }, {merge: true}).then(() => {
          this.saved = true
          this.$emit('saveChanges', this.result.id)
          this.popupSnackbar(`Successfully saved ${this.result.data.name}!`)
        }).catch((err) => {
          console.log('error was caught')
          console.log(err)
          this.popupSnackbar(`Error! ${err.message}`)
        })
      },
      populateData () {
        if (this.result.data.rsvp === undefined) this.rsvp = false; else this.rsvp = this.result.data.rsvp
        if (this.result.data.restrictions === undefined) this.restrictions = ''; else this.restrictions = this.result.data.restrictions
        if (this.result.data.email === undefined) this.email = ''; else this.email = this.result.data.email
        if (this.result.data.song === undefined) this.song = ''; else this.song = this.result.data.song
        if (this.result.data.comment === undefined) this.comment = ''; else this.comment = this.result.data.comment
      },
      popupSnackbar (msg) {
        this.snackbarMessage = msg
        this.showSnackbar = true
      },
      registerUnsavedChange () {
        this.saved = false
        this.$emit('newUnsavedChange', this.result.id)
      }
    },
    created () {
      this.populateData()
    }
  }
</script>

<style>
hr {
  border: 1px solid #ddd
}
.md-radio {
  margin: 4px;
}
.md-radio-label {
  padding-right: 10px;
}
</style>
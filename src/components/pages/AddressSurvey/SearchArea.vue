<template>
  <div>
    <md-empty-state
      md-icon="search"
      md-label="Lookup by full name, email, or phone number"
      md-description="You will be able to respond for yourself and all your guests">
      <md-field>
        <label>Full Name, Email, or Phone Number</label>
        <md-input id="searchInput" v-model="searchInput" @keyup.enter="submitSearch"></md-input>
      </md-field>
      <md-button id="btnSearch" :class="!!searchType && 'md-primary md-raised' " @click="submitSearch" :disabled="isLoading || !searchType">
        <md-progress-spinner v-if="isLoading" :md-diameter="12" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        Search {{searchType}}!
      </md-button>
      <slot/>
    </md-empty-state>
  </div>
</template>

<script>
const regExpPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regExpName = /^[a-z,.'-]+ [a-z ,.'-]+$/i
export default {
  props: ['isLoading'],
  data () {
    return {
      searchInput: ''
    }
  },
  computed: {
    searchType () {
      if (regExpPhone.test(this.searchInput)) {
        return 'phone'
      } else if (regExpEmail.test(this.searchInput)) {
        return 'email'
      } else if (regExpName.test(this.searchInput)) {
        return 'name'
      } else {
        return ''
      }
    }
  },
  methods: {
    submitSearch () {
      if (this.searchType === 'email') {
        this.$emit('submitSearch', this.searchInput, 'email')
        return true
      } else if (this.searchType === 'name') {
        this.$emit('submitSearch', this.searchInput, 'name')
        return true
      } else if (this.searchType === 'phone') {
        let matches = regExpPhone.exec(this.searchInput)
        let cleanPhone = matches[1] + matches[2] + matches[3]
        this.$emit('submitSearch', cleanPhone, 'phone')
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.text-muted {
  color: #666
}
</style>

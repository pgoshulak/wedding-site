<template>
  <div>
    <md-empty-state
      md-icon="search"
      md-label="Lookup by full name, email, or phone number"
      md-description="You will be able to respond for yourself and all your guests">
      <md-field :md-counter="false">
        <label>Full Name, Email, or Phone Number</label>
        <span class="md-prefix" v-if="searchLooksLikePhone">+1</span>
        <md-input id="searchInput" v-model="searchInput" @keyup.enter="submitSearch" maxlength="30"></md-input>
      </md-field>
      <span class="error-helper" v-if="searchErrors.length >= 3">
        Looks like Peter screwed up. <a :href="errorEmailTemplate">Email</a> or <a href="tel:6477633377">text</a> him and complain!.
      </span>
      <pre>
      </pre>
      <md-button id="btnSearch" :class="!!searchType && 'md-primary md-raised' " @click="submitSearch" :disabled="isLoading || !searchType">
        <md-progress-spinner v-if="isLoading" :md-diameter="12" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        Search {{searchType}}!
      </md-button>
      <slot/>
    </md-empty-state>
  </div>
</template>

<script>
const SEARCH_MAX_THRESHOLD = 0.25
const regExpPhoneStart = /^[\(\d]/
const regExpPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regExpName = /^[a-z,.'-]+ [a-z ,.'-]+$/i
export default {
  props: ['isLoading', 'searchErrors', 'simpleGuestDbSearch'],
  data () {
    return {
      searchInput: '',
      simpleSearchResults: []
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
    },
    errorEmailTemplate () {
      return `mailto:pgoshulak+wedding@gmail.com
        ?subject=Your search sucks
        &body=Hey noob, I tried searching for "${this.searchErrors.join('" and "')}", but nothing worked! Can you help?`
    },
    searchLooksLikePhone () {
      return regExpPhoneStart.test(this.searchInput)
    },
    bestNameGuess () {
      if (this.simpleSearchResults[0] && this.simpleSearchResults[0].score < SEARCH_MAX_THRESHOLD) {
        return this.simpleSearchResults[0].item.name
      } else {
        return this.searchInput
      }
    }
  },
  methods: {
    submitSearch () {
      if (this.searchType === 'email') {
        this.$emit('submitSearch', this.searchInput, 'email')
        return true
      } else if (this.searchType === 'name') {
        this.$emit('submitSearch', this.bestNameGuess, 'name')
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
  },
  watch: {
    searchInput (newVal, oldVal) {
      if (newVal.length >= 5 && this.searchType === 'name') {
        this.simpleSearchResults = this.simpleGuestDbSearch.search(newVal)
      } else {
        this.simpleSearchResults = []
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

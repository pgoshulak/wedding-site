<template>
  <div>
    <md-empty-state 
      md-icon="search" 
      md-label="Please enter your email" 
      md-description="You will be able to RSVP for yourself and all your guests">
      <md-field>
        <label>Email</label>
        <md-input id="passwordSearchInput" v-model="searchInput" @keyup.enter="submitSearch"></md-input>
      </md-field>
      <md-button id="btnSearch" class="" @click="submitSearch" :disabled="isLoading">
        <md-progress-spinner v-if="isLoading" :md-diameter="12" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
        Search!
      </md-button>
    </md-empty-state>
  </div>
</template>

<script>
export default {
  props: ['isLoading'],
  data () {
    return {
      searchInput: ''
    }
  },
  methods: {
    submitSearch () {
      this.$emit('submitSearch', this.searchInput)
    }
  }
}
</script>

<style scoped>
</style>
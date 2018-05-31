<template>
  <div id="home">
    <h3 class="md-display-1">Address Survey</h3>
    <SearchArea v-if="searchResults.length==0" @submitSearch="submitSearch"></SearchArea>

  </div>
</template>

<script>
  import SearchArea from './SearchArea'
  export default {
    data () {
      return {
        searchResults: []
      }
    },
    methods: {
      submitSearch (data) {
        console.log(data)
      }
    },
    components: {
      SearchArea
    }
  }
</script>

<style scoped>

</style>
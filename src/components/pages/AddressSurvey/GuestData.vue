<template>
  <div>
    <dl>
      <dt>Name</dt>
      <dd>{{guest.name}}</dd>

      <div v-if="guest.email">
        <dt>Email</dt>
        <dd>{{guest.email}}</dd>
      </div>
      <div v-if="guest.phone">
        <dt>Phone</dt>
        <dd>{{guest.phone}}</dd>
      </div>
    </dl>
  </div>
</template>

<script>
  export default {
    props: ['guest']
  }
</script>

<style scoped>

</style>
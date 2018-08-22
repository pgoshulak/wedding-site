<template>
  <div>
    <md-empty-state 
      md-icon="sentiment_very_dissatisfied" 
      md-label="Thank you for your response" 
      md-description="We're sorry to hear you cannot attend">
      <p>
        We'll miss you on our big day! Please feel free to browse our
        <router-link tag="a" to="/#photos"> photo gallery </router-link>
        or read our
        <router-link tag="a" to="/#our-story"> origin story </router-link>
      </p>
    </md-empty-state>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ConfirmSubmit'
}
</script>

<style scoped>

</style>
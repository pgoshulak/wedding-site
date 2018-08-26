<template>
  <div>
    <md-empty-state
      md-icon="sentiment_very_dissatisfied"
      md-label="Thank you for your response"
      md-description="We're sorry to hear you cannot attend">
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

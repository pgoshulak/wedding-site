<template>
  <div>
    <md-empty-state
      md-icon="favorite_border"
      md-label="Thank you for your response"
      md-description="We'll miss you on June 1st!">
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

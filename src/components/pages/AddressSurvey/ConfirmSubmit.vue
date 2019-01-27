<template>
  <div>
    <md-empty-state
      md-icon="sentiment_very_satisfied"
      md-label="Thank you for your response"
      md-description="We look forward to seeing you on June 1st!">
      <AddToCalendar mountElem="add-to-calendar-submitted" />
    </md-empty-state>
    <slot/>
  </div>
</template>

<script>
import AddToCalendar from '../../misc/AddToCalendar'
export default {
  name: 'ConfirmSubmit',
  components: {
    AddToCalendar
  }
}
</script>

<style scoped>

</style>

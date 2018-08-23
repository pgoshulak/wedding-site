<template>
  <div>
    <md-empty-state
      md-icon="sentiment_very_satisfied"
      md-label="Thank you for your response"
      md-description="Your invitation will be on its way shortly">
      <p>
        While you wait, feel free to browse our
        <router-link tag="a" to="/#photos"> photo gallery </router-link>
        or read our
        <router-link tag="a" to="/#our-story"> origin story </router-link>
      </p>
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

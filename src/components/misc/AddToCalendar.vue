<template>
  <div>
    <div :id="mountElem"></div>
  </div>
</template>

<script>
import { createCalendar } from '../../../static/vendor/ouical.min.js'
export default {
  name: 'AddToCalendar',
  props: {
    mountElem: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      calendarInvites: null
    }
  },
  mounted () {
    this.calendarInvites = createCalendar({
      data: {
        title: '♥ Steph and Peter\'s Wedding ♥',
        start: new Date('June 1 2019, 16:00:00'),
        end: new Date('June 1 2019, 23:00:00'),
        description: 'Steph and Peter are getting married!\n🎉💍👰️\nwww.steph-and-peter.com',
        address: '250 Concession 4 W, Millgrove, ON L8B 1J3'
      }
    })
    const el = document.querySelector(`#${this.mountElem}`)
    el.innerHTML = ''
    el.appendChild(this.calendarInvites)
    el.querySelector('label').innerHTML = '<a>▼ Add to Calendar</a>'
  }
}
</script>

<style scoped>
</style>

<template>
  <div>
    {{message}}
  </div>
</template>

<script>
  const COUNTDOWN_DATE = new Date('June 1, 2019')
  export default {
    computed: {
      daysRemaining () {
        let diff = COUNTDOWN_DATE.getTime() - new Date().getTime()
        return Math.ceil(diff / (1000 * 60 * 60 * 24))
      },
      message () {
        let days = this.daysRemaining
        if (days < 0) return `It's been ${0 - days} days since the wedding, they're MARRIED now`
        if (days === 0) return `IT'S TODAY LET'S GOOO!`
        if (days === 1) return `IT'S TOMORROW AHHHHH!`
        if (days < 3) return `${days} days to go, ZOMG SO SOON!`
        if (days < 7) return `${days} days to go, it's this week!`
        if (days < 31) return `${days} days to go, it's this month!`
        if (days < 60) return `${days} days to go, a couple months away!`
        if (days < 365) return `${days} days to go, less than a year now!`
        return `${days} days to go, over a year still!`
      }
    }
  }
</script>

<style scoped>

</style>
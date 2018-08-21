<template>
  <footer>
    <div class="made-by">Made with ♥ by Peter</div>
    <div class="need-help">Issues? <a class="on-primary-bg" href="mailto:pgoshulak+wedding@gmail.com">Email Peter</a> and complain!</div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
footer {
  background-color: var(--md-theme-default-primary);
  color: rgba(255,255,255,0.7);
  width: 100%;
  padding: 10px;
  height: 40px;
}
a.on-primary-bg {
  color: #FFFF;

  &:hover, &:active, &:visited {
    background-color: #FFFE
  }
}

.made-by {
  float: left;
}

.need-help {
  float: right;
}

@media screen and (max-width: 400px) {
  footer {
    height: 60px;
    text-align: center;
  }
  .made-by, .need-help {
    float: none;
  }
}

</style>
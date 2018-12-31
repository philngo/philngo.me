<template>
  <div class="error-404">
    Not found, redirecting.
  </div>
</template>

<script>
export default {
  name: 'Error404',
  mounted () {
    window.setTimeout(() => {
      this.$router.push('/')
    }, 2000)
  }
}
</script>

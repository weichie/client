<template>
  <div id="app">
    <Header />

    <div class="app-content">
      <Sidebar v-if="isLoggedIn" />

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/elements/Header'
  import Sidebar from './components/elements/Sidebar'

  export default {
    name: 'app',
    components: {
      Header,
      Sidebar
    },
    computed: {
      isLoggedIn(){
        return this.$store.state.authStore.isLoggedIn
      }
    }
  }
</script>

<style lang="scss">
	@import "assets/scss/main";
</style>
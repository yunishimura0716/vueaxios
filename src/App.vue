<template>
  <div id="app">
    <header>
      <template v-if="isAuthenticated">
        <router-link to="/" class="header-item">Board</router-link>
        <span class="header-item" @click="logout">Logout</span>
      </template>
      <template v-if="!isAuthenticated">
        <router-link to="/login" class="header-item">Login</router-link>
        <router-link to="/register" class="header-item">Register</router-link>
      </template>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header-item {
  padding: 10px;
  cursor: pointer;
}
</style>

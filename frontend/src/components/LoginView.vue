<template>
<div>
    <Register v-if="!$store.state.loginView"></Register>
    <Login v-else></Login>
</div>
</template>

<script>
import Register from './Register.vue'
import Login from './Login.vue'

export default {
  name: 'App',
  components: {
    Register,
    Login
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

body {
  background: #fff7eb;
}


</style>

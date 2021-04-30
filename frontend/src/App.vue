<template>
  <NavBar></NavBar>
  <HelloWorld></HelloWorld>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    NavBar
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

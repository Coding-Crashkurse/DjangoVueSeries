<template>
    <div class="button" @click="getData">
      Get my Data
    </div>
    <!-- <div class="cards">
      <h1>{{apidata}}</h1>
    </div> -->
    <div class="card" v-for="item in apidata" :key="item.id">
      <p>Beschreibung {{item.description}}</p>
      <h3 v-if="item.done">Status: Erledigt</h3>
      <h3 v-else>Status: Noch zu tun!</h3>
      <div class="button" v-if="item.done">Zurücknehmen</div>
      <div class="button" v-else>Erledigen</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      name: "Vue.js",
      apidata: []
    }   
  },
  methods: {
    getData() {
      const t = this;
      axios
      .get('http://localhost:8000/todos/')
      .then(response => t.apidata = response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  font-size: 18px;
  padding: 5px 2px;
  border: 1px solid black;
  width: 150px;
  margin: 0 auto;
  cursor: pointer;
  background: black;
  color: white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.button:hover {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.4);
  color: #fff;
  transform: translateY(-3px);
}

.card {
  padding: 10px 10px;
  border: 1px solid black;
  width: 250px;
  margin: 10px auto;
  background: lightgray;
}

</style>

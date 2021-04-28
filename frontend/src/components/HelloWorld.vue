<template>
    <div class="button" @click="getData">
      Get my Data
    </div>

    <div id="tododiv" class="header">
      <h1>Hallo Placeholder, dies deine Todo List</h1>
      <input type="text" id="todoInput" placeholder="Todo...">
      <div class="addBtn">Add todo</div>
    </div>
    <ul>
      <li>fdsd</li>
      <li>fdsd</li>
      <li>fdsd</li>
      <li>fdsd</li>
    </ul>


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
    },
    setToDone(id) {
      const t = this;
      axios
      .delete(`http://localhost:8000/todos/${id}/`)
      .then((response) => {
        console.log(response)
          const idx = this.apidata.findIndex(x => x.id === id)
          this.apidata.splice(idx, 1)
          t.apidata.splice(id-1, 1)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Style the header */
.header {
  background-color: darkorange;
  padding: 20px 50px;
  color: white;
  text-align: center;
}

input {
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  font-size: 16px;
}

/* Style the "Add" button */
.addBtn {
  display: inline;
  padding: 10px;
  background: black;
  color: white;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

/* Remove margins and padding from the list */
ul {
  margin: 0;
  padding: 0;
}
/* 
https://www.w3schools.com/howto/howto_js_todolist.asp */

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;

  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: '';
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}


</style>

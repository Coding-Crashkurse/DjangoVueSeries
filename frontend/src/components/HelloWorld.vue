<template>
    <div class="button" @click="getData">
      Get my Data
    </div>

    <div id="tododiv" class="header">
      <h1>Hallo Placeholder, dies deine Todo List</h1>
      <input type="text" id="todoInput" v-model="textinput" placeholder="Todo...">
      <div class="addBtn" @click="createTask">Add todo</div>
    </div>
    <ul id="todos">
      <div v-for="todo in apidata" :key="todo.id">
        <li class="checked" v-if="!todo.done"><div @click="updateTask(todo.id)">{{todo.description}}<font-awesome-icon icon="check" /></div><div @click="deleteTask(todo.id)"><font-awesome-icon icon="trash"/></div></li>
        <li v-else><div @click="updateTask(todo.id)">{{todo.description}}</div><font-awesome-icon icon="trash" @click="deleteTask(todo.id)"/></li>
      </div>
    </ul>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      name: "Vue.js",
      apidata: [],
      textinput: ""
    }   
  },
  methods: {
    getData() {
      const t = this;
      axios
      .get('http://localhost:8000/todos/')
      .then(response => t.apidata = response.data)
    },
    createTask() {
      const t = this;
      const data = {
        "owner": 1,
        "name": "markus",
        "description": this.textinput,
        "done": false
      }
      axios.post("http://localhost:8000/todos/", data)
      .then(() => {
        t.apidata.push(data)
        console.log("added")
      })
    },
    deleteTask(id) {
      const t = this;
      console.log(id)
      axios
      .delete(`http://localhost:8000/todos/${id}/`)
      .then(() => {
          const idx = this.apidata.findIndex(x => x.id === id)
          console.log(idx)
          t.apidata.splice(idx, 1)
      })
    },
     updateTask(id) {
       const t = this;
       const idx = t.apidata.findIndex(x => x.id === id)
       console.log(id)
       const data = {
         "owner": 1,
         "name": "Markus",
         "text": "walk the dog",
         "done": false
       }
    axios
    .put(`http://localhost:8000/todos/${id}/`, data)
    .then(() => {
     t.apidata[idx].done = !t.apidata[idx].done
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

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;
  display: flex;
  justify-content: space-between;

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

.fa-trash {
  font-size: 20px;
}

.fa-trash:hover {
  color: red;
}

.fa-check {
  margin-left: 10px;
}


</style>

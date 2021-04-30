<template>
<div class="wrapper">
    <div id="tododiv" class="header">
      <h1 v-if="allTodos">Hallo Placeholder, du hast {{allTodos}} Todos, {{openTodos}} davon sind noch offen!</h1>
      <h1 v-else>Hallo Placeholder, du hast noch keine Todos, lege unten ein Todo an.</h1>
      <input type="text" id="todoInput" v-model="textinput" placeholder="Todo...">
      <div class="addBtn" @click="createTask">Add todo</div>
    </div>
    <ul id="todos">
      <div v-for="todo in apidata" :key="todo.id">
        <li class="checked" v-if="todo.done"><div @click="updateTask(todo.id)">{{todo.description}}<font-awesome-icon icon="check" /></div><div @click="deleteTask(todo.id)"><font-awesome-icon icon="trash"/></div></li>
        <li v-else><div @click="updateTask(todo.id)">{{todo.description}}</div><font-awesome-icon icon="trash" @click="deleteTask(todo.id)"/></li>
      </div>
    </ul>
    <h2 id="todo_done" v-if="allTodos > 0 && openTodos === 0">Gratuliere, du hast deine Todos erfolgreich abgeschlossen!</h2>
</div>

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
  mounted() {
    this.getData()
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
        t.getData()
      })
    },
    deleteTask(id) {
      const t = this;
      axios
      .delete(`http://localhost:8000/todos/${id}/`)
      .then(() => {
        t.getData()
      })
    },
     updateTask(id) {
       const t = this;
       const idx = t.apidata.findIndex(x => x.id === id)
       const data = {
        "owner": this.apidata[idx].owner,
        "name": this.apidata[idx].name,
        "description": this.apidata[idx].description,
        "done": !this.apidata[idx].done
      }
      axios
      .put(`http://localhost:8000/todos/${id}/`, data)
      .then(() => {
        t.getData()
      })
      .catch((error) => {
        console.log(error)
        })
      }
  },
  computed:  {
    openTodos() {
      return this.apidata.filter(x => !x.done).length
    },
    allTodos() {
      return this.apidata.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Style the header */
.wrapper {
    width: 80%;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%, 0);
    border: 1px solid black;
}

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
  margin: 15px 0px;
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

#todo_done {
  background: green;
  color: white;
  padding: 10px 0px;
  text-align: center;
}

</style>

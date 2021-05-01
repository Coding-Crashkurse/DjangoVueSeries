<template>
  <div class="wrapper" v-if="$store.state.loggedIn">
    <div id="tododiv" class="header">
      <h1 v-if="allTodos">
        Hallo {{$store.state.userName}}, du hast {{ allTodos }} Todos, {{ openTodos }} davon
        sind noch offen!
      </h1>
      <h1 v-else>
        Hallo {{$store.state.userName}}, du hast noch keine Todos, lege unten ein Todo an.
      </h1>
      <input
        type="text"
        id="todoInput"
        v-model="textinput"
        placeholder="Todo..."
      />
      <div class="addBtn" @click="createTask">Add todo</div>
      <div class="addBtn" id="logout_btn" @click="logout">Logout</div>
    </div>
    <ul id="todos">
      <div v-for="todo in apidata" :key="todo.id">
        <li class="checked" v-if="todo.done">
          <div @click="updateTask(todo.id)">
            {{ todo.description }}<font-awesome-icon icon="check" />
          </div>
          <div @click="deleteTask(todo.id)">
            <font-awesome-icon icon="trash" />
          </div>
        </li>
        <li v-else>
          <div @click="updateTask(todo.id)">{{ todo.description }}</div>
          <font-awesome-icon icon="trash" @click="deleteTask(todo.id)" />
        </li>
      </div>
    </ul>
    <h2 id="todo_done" v-if="allTodos > 0 && openTodos === 0">
      Gratuliere, du hast deine Todos erfolgreich abgeschlossen!
    </h2>
  </div>
  <div class="wrapper" v-else>
    <h1 id="notloggedin">Um die App nutzen zu können, lege bitte einen Account an oder logge dich ein!</h1>
  </div>
  <!-- <h3>{{$store.state.accessToken}}</h3>
  <h3>{{decoded_token}}</h3> -->
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "HelloWorld",
  data() {
    return {
      name: "Vue.js",
      apidata: [],
      textinput: "",
      decoded_token: "",
    };
  },
  created() {
    const t = this;

    const username = window.localStorage.getItem("todo_username")
    t.$store.commit("setUserName", username)

    const token = window.localStorage.getItem("todotoken")
    t.$store.commit("saveAccessToken", token)
    this.checkToken(token)
    this.getData();
    setInterval(() => {
      t.checkToken(t.$store.state.accessToken)
    }, 3000)
  },
  methods: {
    logout() {
      this.$store.commit("setLogin", false)
      this.$store.commit("saveAccessToken", "")
      this.$store.commit("saveRefreshToken", "")
      // this.$router.push({path: "/login"})
    },
    checkToken(token) {
      const t = this;
      if (typeof token !== "undefined" && token.length > 0) { // token initialisiert als leerer String
        let exp = ""
        try {
          exp = jwt_decode(token).exp
          const now = Date.now() / 1000
          const diff = exp - now
          this.decoded_token = diff
          // console.log(diff)
          // console.log(this.$store.state.refreshToken)

          if(diff > 0) {
            t.$store.commit("setLogin", true)
          }
          if (diff < 30) {
            const data = {
              refresh: this.$store.state.refreshToken
            }
            if(this.$store.state.refreshToken !== "") {
              axios.post("http://localhost:8000/api/token/refresh/", data)
              .then((response) => {
                t.$store.commit("saveAccessToken", response.data.access)
                t.$store.commit("setLogin", true)
              })
              .catch((error) => {
                console.log(error)
              })
            }
          }
          if(diff < 0) {
            t.$store.commit("setLogin", false)
          }
        } 
        catch(e) {
          t.$store.commit("setLogin", false)
        }
      } else {
        this.$store.commit("setLogin", false)
      }
    },
    getData() {
      const t = this;
      axios
        .get("http://localhost:8000/todos/", { headers: { Authorization: `Bearer ${t.$store.state.accessToken}`}})
        .then((response) => (t.apidata = response.data));
    },
    createTask() {
      const t = this;
            const data = {
          "name": t.$store.state.userName,
          "description": t.textinput,
          "done": false
      }
      console.log(t.$store.state.accessToken)
      axios.post("http://localhost:8000/todos/", data, { headers: { Authorization: `Bearer ${t.$store.state.accessToken}`}}).then(() => {
        t.getData();
        t.textinput = "";
      });
    },
    deleteTask(id) {
      const t = this;
      axios.delete(`http://localhost:8000/todos/${id}/`, { headers: { Authorization: `Bearer ${t.$store.state.accessToken}`}})
      .then(() => {
        t.getData();
      });
    },
    updateTask(id) {
      const t = this;
      const idx = t.apidata.findIndex((x) => x.id === id);
      const data = {
        name: this.apidata[idx].name,
        description: this.apidata[idx].description,
        done: !this.apidata[idx].done,
      };
      axios
        .put(`http://localhost:8000/todos/${id}/`, data, { headers: { Authorization: `Bearer ${t.$store.state.accessToken}`}})
        .then(() => {
          t.getData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    openTodos() {
      return this.apidata.filter((x) => !x.done).length;
    },
    allTodos() {
      return this.apidata.length;
    },
  },
};
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
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.header {
  background-color: darkorange;
  padding: 50px 50px;
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

#notloggedin {
  padding: 40px 20px;
  background: lightgray;
}

#logout_btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 150px;
}

</style>

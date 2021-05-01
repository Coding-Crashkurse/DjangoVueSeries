<template>
<div>
    <div id=loginwrapper>
        <h1>Login</h1>
        <form class="form" @submit.prevent>
            <input type="text" placeholder="Username" v-model="username">
            <input type="password" placeholder="Passwort" v-model="password">
            <button @click="login">Login</button>
            <div id="registerlink">
            <p @click="loginmessage=!loginmessage">Noch keinen Account?</p>
            <p id="link" @click="$store.state.loginView = false">Dann registriere dich!</p>
        </div>
        </form>
        <div id="loginsuccess" v-if="loginmessage">
            <p>Login erfolgreich... leite weiter...</p>
        </div>
        <div id="loginfail" v-if="errormessage">
            <p>Username oder Passwort nicht korrekt</p>
        </div>
    </div>
</div>

</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
        loginmessage: false,
        errormessage: false,
        username: "",
        password: ""
    };
  },
  methods: {
    login() {
      const t = this;
      const data = {
        username: this.username,
        password: this.password
      };
      axios.post("http://localhost:8000/api/token/", data)
      .then(() => {
        // console.log(response.data.access)
        t.$store.state.userName = data.username
        t.loginmessage = true
        setTimeout(() => { 
           t.loginmessage = false
           t.$router.push({path: "/"})
        }, 1300);
      })
      .catch(() => {
        t.errormessage = true
        setTimeout(() => { 
            t.errormessage = false
        }, 2000);
        
      })
    },
  },
};
</script>

<style scoped>
#loginwrapper {
    padding: 30px 30px;
    width: 500px;
    position: absolute;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%, 0);
    background: white;
    border: 1px solid black;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

input {
    display: block;
    padding: 15px;
    width: 100%;
    background: #f2f2f2;
    margin: 5px 0px;
}

button {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  background: black;
  color: white;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

#registerlink {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

#link {
    margin-left: 5px;
    text-decoration: underline;
    cursor: pointer;
}

#loginsuccess {
    background: darkgreen;
    color: white;
    margin-top: 10px;
    padding: 10px 5px;
}

#loginfail {
    background: darkred;
    color: white;
    margin-top: 10px;
    padding: 10px 5px;
}

</style>

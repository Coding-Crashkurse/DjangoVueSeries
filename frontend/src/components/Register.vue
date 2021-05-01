<template>
<div>
    <div id=loginwrapper>
        <h1>Register</h1>
        <form class="form" @submit.prevent>
            <input type="text" placeholder="Username" v-model="username">
            <input type="password" placeholder="Passwort" v-model="password">
            <input type="password" placeholder="Passwort wiederholen" v-model="password2">
            <input type="email" placeholder="Email" v-model="email">
            <input type="text" placeholder="Vorname" v-model="firstname">
            <input type="text" placeholder="Nachname" v-model="lastname">
            <button @click="register">Registrierung</button>
        </form>
        <div id="loginlink">
        <p>Schon einen Account?</p>
        <p id="link" @click="$store.state.loginView = true">Dann log dich ein</p>
        </div>
        <div id="loginsuccess" v-if="registermessage">
            <p>Registrierung erfolgreich</p>
        </div>
        <div id="loginfail" v-if="errormessage">
            <h3>Probleme mit folgenden Feldern:</h3>
            <br>
            <p v-if="errorcheck.username">Username</p>
            <p v-if="errorcheck.password">Passwort</p>
            <p v-if="errorcheck.email">Email</p>
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
        registermessage: false,
        errormessage: false,
        username: "",
        password: "",
        password2: "",
        email: "",
        firstname: "",
        lastname: "",
        errorcheck: {
            username: false,
            password: false,
            email: false
        }
    };
  },
  methods: {
    register() {
      const t = this;
      const data = {
        username: this.username,
        password: this.password,
        password2: this.password2,
        email: this.email,
        first_name: this.firstname,
        last_name: this.lastname
      };
    axios.post("http://localhost:8000/register/", data)
    .then(() => {
        t.registermessage = true
        setTimeout(() => { 
           t.registermessage = false
        }, 2000);
    })
    .catch((error) => {
        t.errormessage = true
        setTimeout(() => { 
           t.errormessage = false
        }, 3500);
        const allerrors = Object.keys(error.response.data)
        t.errorcheck.username =  allerrors.includes("username")
        t.errorcheck.password = allerrors.includes("password") && allerrors.includes("password2")
        t.errorcheck.email = allerrors.includes("email")
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

#loginlink {
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

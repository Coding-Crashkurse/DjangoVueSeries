import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { createRouter, createWebHashHistory} from "vue-router";
import { createStore } from "vuex";

import TodoView from "./components/TodoView"
import LoginView from "./components/LoginView"

library.add(faTrash);
library.add(faCheck);

const store = createStore({
    state() {
        return {
            accessToken: "",
            refreshToken: "",
            userName: "",
            loginView: true,
            loggedIn: false
        }
    },
    mutations: {
        saveAccessToken(state, token) {
            window.localStorage.setItem("todotoken", token)
            state.accessToken = token
        },
        saveRefreshToken(state, refreshtoken) {
            state.refreshToken = refreshtoken
        },
        setUserName(state, name) {
            window.localStorage.setItem("todo_username", name)
            state.userName = name
        },
        setLogin(state, login) {
            state.loggedIn = login
        }
    }
})

const routes = [
    {path: "/", component: TodoView},
    {path: "/login", component: LoginView},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    linkActiveClass: "active"
})

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(store)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')

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

import HelloWorld from "./components/HelloWorld"
import LoginView from "./components/LoginView"

library.add(faTrash);
library.add(faCheck);

const store = createStore({
    state() {
        return {
            accessToken: "",
            userName: "",
            loginView: false,
            loggedIn: true
        }
    },
    mutations: {
        login(state, token) {
            state.accessToken = token
        }
    }

})

const routes = [
    {path: "/", component: HelloWorld},
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

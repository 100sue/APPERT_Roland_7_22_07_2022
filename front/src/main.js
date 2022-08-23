import { createApp } from 'vue'
import App from './App.vue'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import Home from './components/Home.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import News from './components/News.vue'
import Edit from './components/Edit.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [                                         // Routes are the links that the user can click on to go to a specific page
    { path: '/', component: Home },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/news', component: News },
    { path: '/edit/:id', component: Edit },
]

const router = createRouter({ history: createWebHistory(), routes })


router.beforeEach((to) => {                               // BeforeEach is a hook that is called before each route transition
    if (isLoginRequired(to)) {                            // If the user is not logged in and he tries to go to a private page, he is redirected to the login page
        return router.push('/login')
    }
})

function isLoginRequired(to) {
    if (!isPrivatePage(to)) return false
    if (!isTokenInCache()) return true
    if (!isTokenValid()) return true
    return false
}

function isPrivatePage(to) {                                                  // Define if the page is private or not
    const publicPages = ['/login', '/signup', '/']
    return !publicPages.includes(to.path)
}

function isTokenInCache() {                                                  // Get if the token is in the cache
    return localStorage.getItem('token') != null
}

function isTokenValid() {
    const token = localStorage.getItem('token')
    return token != null
}

createApp(App).mount('#app')

const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.mount('#app')
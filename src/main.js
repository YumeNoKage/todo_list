// style third part
// import "bootstrap" 
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

// local 
import "./assets/style/index.css"

// third part components
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment';
import jQuery from 'jquery'

// local components
import Loading from './components/loading/Loading.vue'
import globalFunction from './services/globalFunction'


axios.defaults.baseURL = 'https://todo.api.devcode.gethired.id'
axios.defaults.params = {}
axios.defaults.params['email'] = 'ericopratama2003@gmail.com'

window.jQuery = window.$ = jQuery
const app = createApp(App)

app.config.globalProperties.$moment = moment
app.mixin(globalFunction)
app.component('Loading',Loading);

app.use(store).use(router).mount('#app')

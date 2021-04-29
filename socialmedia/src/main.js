import Vue from 'vue'
import App from './App.vue'
//import './registerServiceWorker'
import router from './router'
//import store from './store/'
import 'w3-css/w3.css';
import Swal from 'sweetalert2';
import vuetify from './plugins/vuetify';


// IMPORT AXIOS ET CONFIGURATION
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000/api/';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
Vue.prototype.$axios = axios;
// FIN AXIOS

window.Swal = Swal;



Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

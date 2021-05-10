import Vue from 'vue'
import App from './App.vue'
//import './registerServiceWorker'
import router from './router'
//import store from './store/'
import 'w3-css/w3.css';
import Swal from 'sweetalert2';
import vuetify from './plugins/vuetify';
import CKEditor from 'ckeditor4-vue';

Vue.use( CKEditor );
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

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;

Vue.config.productionTip = false

new Vue({
  mode:'history',
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

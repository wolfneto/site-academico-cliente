import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './plugins/axios'
import localStorage from './utils/localStorage'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import store from '@/store/index'
import mask from 'string-mask'
import VueTheMask from 'vue-the-mask'
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';

import "primevue/resources/themes/saga-blue/theme.css"      //theme
import "primevue/resources/primevue.min.css"                //core css
import "primeicons/primeicons.css"                           //icons

const myApp = createApp(App)

myApp.config.globalProperties.$axios = axios
myApp.config.globalProperties.$mask = mask
myApp.config.globalProperties.$LS = localStorage
myApp.use(ToastService);
myApp.use(PrimeVue);
myApp.use(router);
myApp.use(store)
myApp.use(VueTheMask);
myApp.mount('#app')

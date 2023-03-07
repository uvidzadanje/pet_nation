import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

const emitter = mitt()

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.min.js';
import './assets/styles/style.scss'

const app = createApp(App)
app.use(router)
app.use(VueViewer)
app.config.globalProperties.emitter = emitter
app.mount('#app')

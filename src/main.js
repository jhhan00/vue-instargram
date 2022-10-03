import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import store from './store.js'

let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter; // app.config.globalProperties : 글로벌 변수 보관함

app.use(store).mount('#app')

import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');

function a(b) {
  console.log(b);
}
a(5);
console.log(123 + 12233123);

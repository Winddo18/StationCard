import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'windicss'
import 'windi.css'
import print from 'vue3-print-nb'

createApp(App).use(store).use(router).use(print).mount("#app");

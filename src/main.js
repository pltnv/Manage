import "./assets/main.css";
import "@mdi/font/css/materialdesignicons.css";
import i18n from "./plugins/i18n/i18n";

import { createApp } from "vue";
import { createPinia } from "pinia";

import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");

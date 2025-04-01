import i18n from "@/locales/index";

import { Breadcrumb, Button, Input, Modal, Dropdown, Tooltip } from "buefy";
import "buefy/dist/buefy.css";

import "@mdi/font/css/materialdesignicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Button);
app.use(Breadcrumb);
app.use(Dropdown);
app.use(Input);
app.use(Modal);
app.use(Tooltip);
app.mount("#app");

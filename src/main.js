import "@mdi/font/css/materialdesignicons.css";
import i18n from "./plugins/i18n/i18n";
import { Breadcrumb, Button, Input, Modal, Dropdown } from "buefy";
import "buefy/dist/buefy.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Global components
import IInput from "@/components/IInput.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.component("i-input", IInput);
app.use(Button);
app.use(Breadcrumb);
app.use(Dropdown);
app.use(Input);
app.use(Modal);
app.mount("#app");

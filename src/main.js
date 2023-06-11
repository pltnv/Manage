import "@mdi/font/css/materialdesignicons.css";
import i18n from "./plugins/i18n/i18n";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Custom directives
import clickOutside from "@/plugins/directives/click-outside";

// Global components
import IButton from "@/components/IButton.vue";
import IInput from "@/components/IInput.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.component("i-button", IButton);
app.component("i-input", IInput);
app.use(clickOutside);
app.mount("#app");

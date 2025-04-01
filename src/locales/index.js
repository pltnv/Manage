import { createI18n } from "vue-i18n";
import en from "./languages/en";
import ru from "./languages/ru";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    ru
  }
});

export default i18n;

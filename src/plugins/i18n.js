import { createI18n } from "vue-i18n";
import en from "../views/Desk/i18n/en.json";
import ru from "../views/Desk/i18n/ru.json";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    ru
  }
});

// console.log(i18n.global.locale);

export default i18n;

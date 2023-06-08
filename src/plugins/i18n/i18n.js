import { createI18n } from "vue-i18n";
import en from "../../views/Desk/i18n/en.json";
import ru from "../../views/Desk/i18n/ru.json";

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

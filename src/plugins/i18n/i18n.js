import { createI18n } from "vue-i18n";
import en from "../../views/Desk/locales/en.json";
import ru from "../../views/Desk/locales/ru.json";

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

import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { useLocalStorage } from "../composable/useLocalStorage";

export const useI18nStore = defineStore("i18nStore", () => {
  let { locale } = useI18n();

  const toggleLocale = () => {
    locale.value === "en" ? (locale.value = "ru") : (locale.value = "en");
  };

  useLocalStorage(locale, "locale");

  return {
    locale,
    toggleLocale
  };
});

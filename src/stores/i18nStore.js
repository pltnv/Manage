import { computed } from "vue";
import { defineStore } from "pinia";

export const useI18nStore = defineStore("i18nStore", () => {
  let locale = computed(() => i18n.global.locale);

  const setLocale = (locale) => {
    if (locale !== "ru" && locale !== "en") return;
    i18n.global.locale = locale;
  };

  return {
    locale,
    setLocale
  };
});

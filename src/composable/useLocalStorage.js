import { watch } from "vue";

export function useLocalStorage(val, key, isDeep) {
  if (localStorage.getItem(key)) {
    val.value = JSON.parse(localStorage.getItem(key));
  }

  watch(
    () => val.value,
    (newVal) => {
      localStorage.setItem(key, JSON.stringify(newVal));
    },
    { deep: isDeep }
  );
}

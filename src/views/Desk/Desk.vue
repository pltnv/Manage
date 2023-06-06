<script setup>
import { ref } from "vue";
import Column from "../Desk/components/Column.vue";
import { useI18nStore } from "../../stores/i18nStore";
const i18n = useI18nStore();

// mock data
const tasks = ref([{ text: "Написать письмо" }, { text: "Отправить проект" }]);
</script>

<template>
  <main>
    Desk page
    <Column :title="'Работа над проектом'" :tasks="tasks" />
    <button @click="i18n.toggleLocale">Toggle locale</button>
  </main>
</template>

<script setup>
import { ref } from "vue";
import Column from "../Desk/components/Column.vue";

// mock data
const tasks = ref([{ text: "Написать письмо" }, { text: "Отправить проект" }]);
</script>

<template>
  <main>
    Desk page
    <Column :title="'Работа над проектом'" :tasks="tasks" />
  </main>
</template>

<script setup>
import { ref } from "vue";
import Column from "../Desk/components/Column.vue";

// mock data
const tasks = ref([{ text: "Написать письмо" }, { text: "Отправить проект" }]);

const clickDotsEmitHandler = () => {
  console.log("emit: click dots");
};

const saveTaskEmitHandler = () => {
  console.log("emit: click save new task");
};
</script>

<template>
  <main>
    Desk page
    <Column
      :title="'Работа над проектом'"
      :tasks="tasks"
      @click:dots="clickDotsEmitHandler"
      @click:saveTask="saveTaskEmitHandler"
    />
  </main>
</template>

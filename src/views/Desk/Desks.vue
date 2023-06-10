<script setup>
import { ref } from "vue";
import Column from "./components/Column.vue";

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
  <div>
    Desk page
    <Column
      :title="'Работа над проектом'"
      :tasks="tasks"
      @click:dots="clickDotsEmitHandler"
      @click:saveTask="saveTaskEmitHandler"
    />
  </div>
</template>

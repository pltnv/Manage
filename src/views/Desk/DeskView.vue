<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column.vue";
import Desk from "./components/Desk.vue";

const route = useRoute();
const personalTaskStore = usePersonalTaskStore();

let { boards } = personalTaskStore;
let currentBoardIndex = computed(() => route.params.id);

const clickDotsEmit = (boardIndex) => {
  console.log(boardIndex);
};

const clickEditEmit = (deskIndex, newTask) => {
  const [taskIndex, newTaskText] = newTask;
  personalTaskStore.editTask(currentBoardIndex.value, deskIndex, taskIndex, newTaskText);
};

const saveTaskEmit = (deskIndex, newTaskText) => {
  if (newTaskText) {
    personalTaskStore.addTask(currentBoardIndex.value, deskIndex, newTaskText);
  }
};

const editTitleEmit = (newTitle) => {
  const [newTitleText, oldTitle] = newTitle;
  personalTaskStore.renameDesk(currentBoardIndex.value, oldTitle, newTitleText);
};
</script>

<template>
  <div class="desk-view">
    <div
      v-for="(desk, index) in boards[currentBoardIndex].desks"
      :key="index"
      class="desk-view__desks"
    >
      <Column
        :title="desk.title"
        :tasks="desk.tasks"
        @click:editTitle="editTitleEmit($event)"
        @click:dots="clickDotsEmit(index)"
        @click:editTask="clickEditEmit(index, $event)"
        @click:saveTask="saveTaskEmit(index, $event)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.desk-view {
  display: flex;
  gap: 10px;
}
</style>

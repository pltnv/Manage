<script setup>
import { computed } from "vue";
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

const clickEditEmit = (boardIndex, taskIndex) => {
  console.log(boardIndex);
  console.log(taskIndex);
};

const saveTaskEmit = (currentBoardIndex, deskIndex, newTaskText) => {
  personalTaskStore.addTask(currentBoardIndex, deskIndex, newTaskText);
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
        @click:dots="clickDotsEmit(index)"
        @click:editTask="clickEditEmit(index, $event)"
        @click:saveTask="saveTaskEmit(currentBoardIndex, index, $event)"
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

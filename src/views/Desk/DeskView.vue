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

let boardName = computed(() => {
  return route.query?.board;
});

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

const dropHandler = (e, deskIndex) => {
  const [oldIndex, newIndex, task] = e;
  console.log(
    "dropHandler",
    "oldIndex",
    oldIndex,
    "new index",
    newIndex,
    "task",
    task,
    "deskIndex",
    deskIndex,
    "currentBoard",
    currentBoardIndex.value
  );
  personalTaskStore.moveTask(currentBoardIndex.value, deskIndex, oldIndex, newIndex);
};
</script>

<template>
  <div class="desk-view">
    <!-- to fix -->
    <div>
      {{ boardName }}
    </div>

    <div class="desk-view__main">
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
          @drop:event="dropHandler($event, index)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.desk-view {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__main {
    display: flex;
    gap: 10px;
  }
}
</style>

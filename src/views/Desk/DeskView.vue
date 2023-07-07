<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column/Column.vue";
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

const deleteTaskEmit = (deskIndex, taskIndex) => {
  personalTaskStore.removeTask(currentBoardIndex.value, deskIndex, taskIndex);
};

const dropTaskHandler = (e, deskIndex) => {
  const [oldIndex, newIndex, task] = e;
  personalTaskStore.moveTask(
    currentBoardIndex.value,
    deskIndex,
    oldIndex,
    task,
    newIndex
  );
  console.log("1");
};

const dropHandler = (e, deskIndex) => {
  try {
    let task = JSON.parse(e.dataTransfer.getData("task"));
    let oldIndex = e.dataTransfer.getData("oldTaskIndex");

    personalTaskStore.moveTask(currentBoardIndex.value, deskIndex, oldIndex, task);
  } catch {
    let deskOldIndex = e.dataTransfer.getData("deskOldIndex");
    personalTaskStore.moveDesk(currentBoardIndex.value, deskIndex, deskOldIndex);
  }
};

const dragHandler = (e, deskIndex) => {
  e.dataTransfer.setData("deskOldIndex", deskIndex);
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
          @click:deleteTask="deleteTaskEmit(index, $event)"
          @drop:task="dropTaskHandler($event, index)"
          @drop="dropHandler($event, index)"
          @dragstart="dragHandler($event, index)"
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

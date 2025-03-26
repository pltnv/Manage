<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column/Column.vue";
import Desk from "./components/Desk.vue";
import DesksWrapper from "@/components/PageWrapper.vue";

const route = useRoute();
const personalTaskStore = usePersonalTaskStore();

const { board } = route.query;
let { boards } = personalTaskStore;

const currentBoardIndex = computed(() => route.params.id);

const boardName = computed(() => {
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
};

const dropHandler = (e, deskIndex) => {
  try {
    const task = JSON.parse(e.dataTransfer.getData("task"));
    const oldIndex = e.dataTransfer.getData("oldTaskIndex");

    personalTaskStore.moveTask(currentBoardIndex.value, deskIndex, oldIndex, task);
  } catch (e) {
    const deskOldIndex = e.dataTransfer.getData("deskOldIndex");
    personalTaskStore.moveDesk(currentBoardIndex.value, deskIndex, deskOldIndex);
  }
};

const dragHandler = (e, deskIndex) => {
  e.dataTransfer.setData("deskOldIndex", deskIndex);
};
</script>

<template>
  <DesksWrapper>
    <div class="desks__header">
      <div>
        <h1 v-text="board" />
        <b-breadcrumb align="is-left" size="is-small">
          <b-breadcrumb-item tag="router-link" to="/desks">
            {{ $t("boards.title") }}
          </b-breadcrumb-item>
          <b-breadcrumb-item tag="router-link" to="/" active>
            {{ board }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </div>
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
  </DesksWrapper>
</template>

<style lang="scss">
.desk-view__main {
  display: flex;
  gap: 10px;
}

.desks__header {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>

<script setup>
import { useRoute } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column/Column.vue";
import Desk from "./components/Desk.vue";
import DesksWrapper from "@/components/PageWrapper.vue";
import { useBoards } from "../../composable/useBoards";

const route = useRoute();
const personalTaskStore = usePersonalTaskStore();
const { currentBoardIndex, boardName, boards } = useBoards();

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
    const deskOldIndex = e.dataTransfer.getData("deskOldIndex");
    personalTaskStore.moveDesk(currentBoardIndex.value, deskIndex, deskOldIndex);
  } catch (e) {
    // todo
    console.warn(e);
  }
};

const dragHandler = (e, deskIndex) => {
  e.dataTransfer.setData("deskOldIndex", deskIndex);
};
</script>

<template>
  <DesksWrapper>
    <div :class="$style.desksHeader">
      <div>
        <h1 v-text="boardName" />
        <b-breadcrumb align="is-left" size="is-small">
          <b-breadcrumb-item tag="router-link" to="/desks">
            {{ $t("boards.title") }}
          </b-breadcrumb-item>
          <b-breadcrumb-item tag="router-link" to="/" active>
            {{ boardName }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </div>
    </div>

    <div :class="$style.deskViewMain">
      <div
        v-for="(desk, index) in boards[currentBoardIndex].desks"
        :key="index"
        :class="$style.desks"
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

<style lang="scss" module>
.desksHeader {
  display: flex;
  align-items: center;
  gap: 6px;
}
.deskViewMain {
  display: flex;
  gap: 10px;
}

.desks {
}
</style>

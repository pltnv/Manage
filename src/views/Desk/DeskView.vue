<script setup>
import { useRoute } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column/Column.vue";
import Desk from "./components/Desk.vue";
import DesksWrapper from "@/components/PageWrapper.vue";
import { useBoards } from "../../composable/useBoards";
import { useBoardHandlers } from "../../composable/useBoardHandlers";

const route = useRoute();
const personalTaskStore = usePersonalTaskStore();

const { currentBoardIndex, boardName, boards } = useBoards();

const {
  clickDotsEmit,
  clickEditEmit,
  saveTaskEmit,
  editTitleEmit,
  deleteTaskEmit,
  dropTaskHandler,
  dropHandler,
  dragHandler
} = useBoardHandlers(personalTaskStore, currentBoardIndex);
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

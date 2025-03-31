<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column.vue";
import Desk from "./components/Desk.vue";
import AddColumn from "./components/AddColumn.vue";
import DesksWrapper from "@/components/PageWrapper.vue";
import { useBoards } from "./composables/useBoards";
import { useBoardHandlers } from "./composables/useBoardHandlers";

const route = useRoute();
const personalTaskStore = usePersonalTaskStore();

const { currentBoardIndex, boardName, boards } = useBoards();

const {
  clickEditEmit,
  saveTaskEmit,
  editTitleEmit,
  deleteTaskEmit,
  dropTaskHandler,
  dropHandler,
  dragHandler,
  deleteColumn
} = useBoardHandlers(personalTaskStore, currentBoardIndex);

const handleAddNewColumn = (newColumnTitle) => {
  personalTaskStore.addDesk(currentBoardIndex.value, newColumnTitle);
};

const hasColumns = computed(() => boards[currentBoardIndex.value]?.desks?.length);
</script>

<template>
  <DesksWrapper>
    <div :class="$style.desksHeader">
      <div :class="$style.headerContent">
        <h1 :class="$style.boardTitle" v-text="boardName" />
        <b-breadcrumb :class="$style.breadcrumb" align="is-left" size="is-small">
          <b-breadcrumb-item tag="router-link" to="/boards">
            {{ $t("boards.title") }}
          </b-breadcrumb-item>
          <b-breadcrumb-item tag="router-link" to="/" active>
            {{ boardName }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </div>
    </div>

    <div :class="$style.deskViewMain">
      <template v-if="hasColumns">
        <div
          v-for="(desk, index) in boards[currentBoardIndex].desks"
          :key="index"
          :class="$style.desks"
        >
          <Column
            :title="desk.title"
            :tasks="desk.tasks"
            @click:editTitle="editTitleEmit($event)"
            @click:editTask="clickEditEmit(index, $event)"
            @click:saveTask="saveTaskEmit(index, $event)"
            @click:deleteTask="deleteTaskEmit(index, $event)"
            @click:deleteColumn="deleteColumn(index)"
            @drop:task="dropTaskHandler($event, index)"
            @drop="dropHandler($event, index)"
            @dragstart="dragHandler($event, index)"
          />
        </div>
      </template>

      <AddColumn @add-column="handleAddNewColumn" />
    </div>
  </DesksWrapper>
</template>

<style lang="scss" module>
.desksHeader {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
}

.headerContent {
  width: 100%;
}

.boardTitle {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

.breadcrumb {
  padding: 0;
}

.deskViewMain {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  min-height: calc(100vh - 180px);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;

    &:hover {
      background: #a8a8a8;
    }
  }
}

.desks {
  min-width: 280px;
  width: 280px;
}
</style>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column/Column.vue";
import Desk from "./components/Desk.vue";
import DropDown from "./components/DropDown.vue";
import DesksWrapper from "@/components/PageWrapper.vue";

const personalTaskStore = usePersonalTaskStore();
const router = useRouter();

let { boards, addBoard } = personalTaskStore;

// Boards
const searchValue = ref("");

const filteredBoards = computed(() => {
  if (searchValue.value) {
    return boards.filter((board) => {
      return board.title.toLowerCase().includes(searchValue.value.toLowerCase());
    });
  }

  return boards;
});

// New desk modal
const newBoardName = ref("");
const showAddDeskModal = ref(false);

const closeAddDeskModal = () => {
  showAddDeskModal.value = true;
};
const openAddDeskModal = () => {
  showAddDeskModal.value = true;
};
const createDesk = (newBoard) => {
  if (newBoardName) {
    showAddDeskModal.value = false;
    addBoard(newBoard);
  }
};

const openDesk = async (id, boardName) => {
  await router.push({ name: "Desk", params: { id }, query: { board: boardName } });
};
</script>

<template>
  <DesksWrapper>
    <div class="desks__header">
      <div class="header-left">
        <h1 v-text="$t('boards.title')" />

        <b-breadcrumb align="is-left" size="is-small">
          <b-breadcrumb-item tag="router-link" to="/" active>
            {{ $t("boards.title") }}
          </b-breadcrumb-item>
        </b-breadcrumb>
      </div>

      <div class="header-right">
        <b-input
          v-model="searchValue"
          :placeholder="$t('boards.search')"
          type="search"
          icon="magnify"
          icon-clickable
          size="is-small"
        />

        <b-button
          type="is-primary"
          size="is-small"
          icon-left="plus"
          rounded
          @click="openAddDeskModal"
        >
          {{ $t("boards.actions.create") }}
        </b-button>
      </div>
    </div>

    <div class="desks__wrapper">
      <div class="boards-container">
        <template v-for="(board, index) in filteredBoards" :key="index">
          <Desk
            @drag.stop="drag($event)"
            :title="board.title"
            :color="board.color"
            @click="openDesk(index, board.title)"
          />
        </template>
      </div>
    </div>

    <b-modal
      v-model="showAddDeskModal"
      trap-focus
      :width="400"
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
    >
      <template #default>
        <DropDown @close="closeAddDeskModal" @create="createDesk"
      /></template>
    </b-modal>
  </DesksWrapper>
</template>

<style lang="scss">
.desks__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
  border-bottom: 2px solid #eaeaea;
  margin-bottom: 8px;
}

.desks__wrapper {
  flex: 1;
  overflow: hidden;
  padding: 8px;

  .boards-container {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    height: auto;
    overflow-x: auto;
    padding-bottom: 16px;

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
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  }
}

.header-right {
  display: flex;
  margin-right: 0 auto;
  gap: 30px;
}
</style>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column.vue";
import Desk from "./components/Desk.vue";
import DropDown from "./components/DropDown.vue";

const personalTaskStore = usePersonalTaskStore();
const router = useRouter();

let { boards, addBoard } = personalTaskStore;

let showAddMenu = ref(false);
let showSearch = ref(false);
let searchValue = ref("");
let newBoardName = ref("");
let sortValue = ref("");

let filteredBoards = computed(() => {
  if (searchValue.value) {
    return boards.filter((board) => {
      return board.title.toLowerCase().includes(searchValue.value.toLowerCase());
    });
  }

  return boards;
});

const openDesk = async (id, boardName) => {
  await router.push({ name: "Desk", params: { id }, query: { board: boardName } });
};

const addNewDesk = () => {
  showAddMenu.value = true;
};

const saveNewDesk = (newBoard) => {
  console.log(newBoard);
  if (newBoardName) {
    showAddMenu.value = false;
    addBoard(newBoard);
  }
};

const closeAddMenu = () => {
  showAddMenu.value = false;
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  searchValue.value = "";
};

const drag = (e) => {
  console.log("из desks", e);
};
</script>

<template>
  <div class="desks">
    <div class="desks__header">
      <h1 v-text="$t('boards.title')" />
      <div class="button-wrapper">
        <i-button variant="icon" icon-left="mdi-plus" @click="addNewDesk" />
        <drop-down v-if="showAddMenu" @close="closeAddMenu" @create="saveNewDesk" />
      </div>
      <i-button variant="icon" icon-left="mdi-magnify" @click="toggleSearch" />
      <i-input
        v-if="showSearch"
        v-model="searchValue"
        :placeholder="$t('boards.search')"
        clearable
        autofocus
      />
    </div>

    <div class="desks__wrapper">
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
</template>

<style lang="scss">
.desks {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  height: 100vh;

  &__header {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid black;
    padding: 8px 4px;
  }

  &__wrapper {
    position: relative;
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }
}
</style>

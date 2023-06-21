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
let isSearch = ref(false);
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

const openDesk = async (id) => {
  await router.push({ name: "Desk", params: { id } });
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
</script>

<template>
  <div class="desks">
    <div class="desks__header">
      <h1 v-text="$t('boards.title')" />
      <div class="button-wrapper">
        <i-button variant="icon" icon-left="mdi-plus" @click="addNewDesk" />
        <drop-down v-if="showAddMenu" @close="closeAddMenu" @create="saveNewDesk" />
      </div>
    </div>

    <div class="desks__wrapper">
      <div v-for="(board, index) in filteredBoards" :key="index">
        <Desk :title="board.title" :color="board.color" @click="openDesk(index)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.desks {
  padding: 10px;
  height: 100%;

  &__wrapper {
    position: relative;
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
    // height: 100%;
  }

  &__header {
    display: flex;
    gap: 6px;
  }
}
</style>

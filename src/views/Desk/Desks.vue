<script setup>
import { useRouter } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column.vue";
import Desk from "./components/Desk.vue";

const personalTaskStore = usePersonalTaskStore();
const router = useRouter();

let { boards } = personalTaskStore;

let openDesk = async (id) => {
  await router.push({ name: "Desk", params: { id } });
};

console.log(boards);
</script>

<template>
  <div class="desks">
    <h1>Desks</h1>
    <div class="desks__wrapper">
      <div v-for="(board, index) in boards" :key="index">
        <Desk :title="board.title" color="red" @click="openDesk(index)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.desks {
  padding: 10px;

  &__wrapper {
    display: flex;
    background: blue;
    gap: 14px;
    flex-wrap: wrap;
    padding: 10px;
  }
}
</style>

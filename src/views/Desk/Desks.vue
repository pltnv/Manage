<script setup>
import { useRouter } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";
import Column from "./components/Column.vue";
import Desk from "./components/Desk.vue";

const personalTaskStore = usePersonalTaskStore();
const router = useRouter();

let { columns } = personalTaskStore;

let openDesk = async (id) => {
  await router.push({ name: "Desk", params: { id } });
};
</script>

<template>
  <div class="desks">
    <h1>Desks</h1>
    <div class="desks__wrapper">
      <div v-for="(desk, index) in columns" :key="index">
        <Desk :title="desk.title" color="red" @click="openDesk(index)" />
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
    padding: 4px;
  }
}
</style>

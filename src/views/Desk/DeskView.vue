<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Column from "./components/Column.vue";
import Desk from "./components/Desk.vue";

const route = useRoute();

let currentBoardIndex = computed(() => route.params.id);
</script>

<template>
  <div>
    <Column :title="'Работа над проектом'" :tasks="tasks" />
  </div>

  <!-- 
todo: add emits -->
  <!-- @click:dots="clickDotsEmitHandler" @click:saveTask="saveTaskEmitHandler" -->
</template>

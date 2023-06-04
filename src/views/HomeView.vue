<script setup>
import { usePersonalTaskStore } from "../stores/personalTaskStore";
import { storeToRefs } from "pinia/dist/pinia";

const personalTaskStore = usePersonalTaskStore();
</script>

<template>
  <main>
    {{ personalTaskStore.columns }}
    <button @click="personalTaskStore.addBoard('todo')" />
  </main>
</template>

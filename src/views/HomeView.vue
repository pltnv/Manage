<script setup>
import { usePersonalTaskStore } from "../stores/personalTaskStore";
import { storeToRefs } from "pinia/dist/pinia";

const personalTaskStore = usePersonalTaskStore();
</script>

<template>
  <div>Home</div>
</template>

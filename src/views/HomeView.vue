<script setup>
import { usePersonalTaskStore } from "../stores/personalTaskStore";
import { storeToRefs } from "pinia/dist/pinia";
import IAvatar from "@/components/IAvatar.vue";

const personalTaskStore = usePersonalTaskStore();
</script>

<template>
  <div>Home</div>
  <i-avatar />
</template>

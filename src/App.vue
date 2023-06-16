<script setup>
import { RouterView } from "vue-router";
import { useNotificationStore } from "@/stores/notificationStore.js";

const notificationStore = useNotificationStore();
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>

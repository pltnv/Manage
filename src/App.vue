<script setup>
import { RouterView } from "vue-router";
import { useNotificationStore } from "@/stores/notificationStore.js";

const notificationStore = useNotificationStore();
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>

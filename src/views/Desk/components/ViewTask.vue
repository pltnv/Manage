<script setup>
import { ref } from "vue";

const props = defineProps({
  task: {
    required: false,
    type: Object
  }
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
  <div class="i-drop-down">
    {{ props.task.task }}
  </div>
</template>

<style lang="scss"></style>

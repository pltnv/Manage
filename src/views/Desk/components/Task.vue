<script setup>
defineProps({
  task: {
    required: true,
    type: String
  }
});
</script>

<template>
  <div class="task">
    <div v-text="task" class="task__content" />
    <div class="task__edit" />
  </div>
</template>

<style lang="scss">
.task {
  display: flex;
  gap: 4px;
  width: 240px;
  border-radius: 8px;
  min-height: 20px;
  max-height: 40px;
  padding: 10px;
  background: red;

  &__edit {
    margin-left: auto;
  }
}
</style>

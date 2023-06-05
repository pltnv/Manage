<script setup>
import Task from "../components/Task.vue";

defineProps({
  title: {
    required: true,
    type: String
  },
  tasks: {
    required: false,
    type: Array
  }
});
</script>

<template>
  <div class="desk-column">
    <div class="desk-column__title">
      <div v-text="title" />
      <button />
    </div>
    <div class="desk-column__tasks">
      <div v-for="(task, index) in tasks" :key="index">
        <Task :task="task.text" />
      </div>
    </div>
    <button v-text="$t('column.addTask')" />
  </div>
</template>

<style lang="scss">
.desk-column {
  display: flex;
  flex-direction: column;
  width: 270px;
  background: green;
  padding: 6px;
  gap: 4px;

  &__title {
    display: flex;
    min-height: 30px;

    button {
      margin-left: auto;
    }
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
</style>

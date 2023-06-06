<script setup>
import { ref } from "vue";
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

const emit = defineEmits(["click:dots", "click:saveTask", "click:editTask"]);

let showAddContent = ref(false);
const addTask = () => {
  showAddContent.value = !showAddContent.value;
};

const closeAddContent = () => {
  showAddContent.value = false;
};

const editTaskEmitHandler = () => {
  emit("click:editTask");
};

const openDotsEmit = () => {
  emit("click:dots");
};

const saveTaskEmit = () => {
  showAddContent.value = false;
  emit("click:saveTask");
};
</script>

<template>
  <div class="desk-column">
    <div class="desk-column__title">
      <div v-text="title" />
      <button class="mdi mdi-dots-grid" @click="openDotsEmit" />
    </div>
    <div class="desk-column__tasks">
      <div v-for="(task, index) in tasks" :key="index">
        <Task :task="task.text" @click:editTask="editTaskEmitHandler" />
      </div>
      <textarea v-if="showAddContent" />
    </div>
    <button v-if="!showAddContent" v-text="$t('column.addTask')" @click="addTask" />
    <div v-else class="desk-column__save">
      <button
        class="desk-column__save__btn"
        v-text="$t('column.addTask')"
        @click="saveTaskEmit"
      />
      <button class="mdi mdi-close" @click="closeAddContent" />
    </div>
  </div>
</template>

<style lang="scss">
.desk-column {
  display: flex;
  flex-direction: column;
  width: 270px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: 10px;
  border-radius: 10px;
  gap: 12px;

  &__title {
    display: flex;
    align-items: center;
    min-height: 30px;
    padding: 0 2px 0 2px;

    button {
      margin-left: auto;
    }
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__save {
    display: flex;
    justify-content: flex-start;
    gap: 4px;

    &__btn {
      width: 180px;
    }
  }
}
</style>

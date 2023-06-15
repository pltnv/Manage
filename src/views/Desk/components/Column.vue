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
  },
  bgc: {
    required: false,
    type: String
  }
});

const emit = defineEmits(["click:dots", "click:saveTask", "click:editTask"]);

let newTask = ref("");

let showAddContent = ref(false);
const addTask = () => {
  showAddContent.value = !showAddContent.value;
};

const closeAddContent = () => {
  showAddContent.value = false;
};

const editTaskEmitHandler = (taskIndex, newTaskText) => {
  emit("click:editTask", [taskIndex, newTaskText]);
};

const clickDotsEmit = () => {
  emit("click:dots");
};

const saveTaskEmit = () => {
  showAddContent.value = false;
  emit("click:saveTask", newTask.value);
  newTask.value = "";
};
</script>

<template>
  <div class="desk-column" :style="{ background: bgc }">
    <div class="desk-column__title">
      <div v-text="title" />
      <i-button variant="icon" icon-left="mdi-dots-grid" @click="clickDotsEmit" />
    </div>

    <div class="desk-column__tasks">
      <div v-for="(task, index) in tasks" :key="index">
        <Task :task="task" @click:editTask="editTaskEmitHandler(index, $event)" />
      </div>
      <textarea v-if="showAddContent" v-model="newTask" />
    </div>

    <i-button
      v-if="!showAddContent"
      icon-left="mdi-plus"
      variant="text"
      block
      size="md"
      round="8px"
      :label="$t('column.addTask')"
      @click="addTask"
    />

    <div v-else class="desk-column__save">
      <i-button
        round="8px"
        size="md"
        :label="$t('column.addTask')"
        class="desk-column__save__btn"
        @click="saveTaskEmit"
      />
      <i-button variant="icon" size="sm" icon-left="mdi-close" @click="closeAddContent" />
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
    align-items: center;
    justify-content: flex-start;
    gap: 4px;

    &__btn {
      width: 180px;
    }
  }
}
</style>

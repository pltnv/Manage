<script setup>
import { ref } from "vue";

const props = defineProps({
  task: {
    required: true,
    type: String
  }
});

const emit = defineEmits(["click:editTask"]);

let isEdit = ref(false);

const openAddTask = () => {
  isEdit.value = true;
};

const saveTask = (newText) => {
  emit("click:editTask", newText);
};

const closeEditing = () => {
  isEdit.value = false;
};
</script>

<template>
  <div class="task">
    <template v-if="!isEdit">
      <div v-text="task" class="task__content" />
      <div class="task__edit">
        <button class="mdi mdi-pencil" @click="openAddTask" />
      </div>
    </template>
    <template v-else>
      <i-input :modelValue="task" @update:modelValue="saveTask($event)" />
      <button class="mdi mdi-content-save-outline" @click="closeEditing" />
    </template>
  </div>
</template>

<style lang="scss">
.task {
  display: flex;
  gap: 4px;
  width: 250px;
  border-radius: 10px;
  min-height: 20px;
  max-height: 40px;
  padding: 10px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;

    .task__edit {
      visibility: visible;
    }
  }

  &__content {
    padding-right: 14px;
  }

  &__edit {
    visibility: hidden;
    margin-left: auto;
  }
}
</style>

<script setup>
import { ref } from "vue";

const props = defineProps({
  task: {
    required: true,
    type: String
  }
});

const emit = defineEmits(["click:editTask"]);

const isEdit = ref(false);

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
  <div class="task" :draggable="true" @dragenter.prevent @dragover.prevent>
    <template v-if="!isEdit">
      <div v-text="task" class="task__content" />
      <div class="task__edit">
        <i-button variant="icon" class="mdi mdi-pencil" @click="openAddTask" />
      </div>
    </template>

    <template v-else>
      <i-input
        :modelValue="task"
        @update:modelValue="saveTask($event)"
        @blur="closeEditing"
      />
      <i-button
        variant="icon"
        class="mdi mdi-content-save-outline"
        @click="closeEditing"
      />
    </template>
  </div>
</template>

<style lang="scss">
.task {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 250px;
  border-radius: 10px;
  min-height: 20px;
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

  .task__edit {
    cursor: pointer;
  }

  &__content {
    padding-right: 4px;
  }

  &__edit {
    visibility: hidden;
    margin-left: auto;
  }
}
</style>

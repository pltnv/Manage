<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  task: {
    required: true,
    type: String
  }
});

const emit = defineEmits(["click:editTask"]);

const isEditing = ref(false);
const editedTaskText = ref(props.task);

const startEditing = () => {
  editedTaskText.value = props.task;
  isEditing.value = true;
};

const saveTask = () => {
  if (editedTaskText.value && editedTaskText.value !== props.task) {
    emit("click:editTask", editedTaskText.value.trim());
  }
  isEditing.value = false;
};

const cancelEditing = () => {
  isEditing.value = false;
};
</script>

<template>
  <div class="task-card" :draggable="true" @dragenter.prevent @dragover.prevent>
    <div v-if="!isEditing" class="task-content">
      <p class="task-text" v-text="task" />
      <b-button
        type="is-text"
        size="is-small"
        icon-right="pencil"
        class="edit-button"
        @click="startEditing"
      />
    </div>

    <div v-else class="task-edit">
      <b-input
        v-model="editedTaskText"
        type="textarea"
        size="is-small"
        rows="2"
        autofocus
        @keyup.enter="saveTask"
        @keyup.esc="cancelEditing"
      />
      <div class="edit-actions">
        <b-button
          type="is-primary"
          size="is-small"
          icon-right="content-save"
          @click="saveTask"
        />
        <b-button
          type="is-text"
          size="is-small"
          icon-right="close"
          @click="cancelEditing"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-card {
  position: relative;
  width: 100%;
  min-height: 60px;
  padding: 12px;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: grab;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);

    .edit-button {
      opacity: 1;
    }
  }

  &:active {
    cursor: grabbing;
  }
}

.task-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.task-text {
  flex-grow: 1;
  margin: 0;
  word-break: break-word;
  line-height: 1.4;
}

.edit-button {
  opacity: 0;
  transition: opacity 0.2s ease;
  margin-left: auto;
}

.task-edit {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: 4px;
}
</style>
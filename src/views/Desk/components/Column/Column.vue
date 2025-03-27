<script setup>
import { ref } from "vue";
import Task from "./Task.vue";
import ViewTask from "../ViewTask/ViewTask.vue";

const props = defineProps({
  title: {
    required: true,
    type: String
  },
  tasks: {
    required: false,
    type: Array,
    default: () => []
  },
  bgc: {
    required: false,
    type: String,
    default: "#f5f5f5"
  }
});

const emit = defineEmits([
  "update:title",
  "click:dots",
  "click:saveTask",
  "click:editTask",
  "drop:task",
  "click:deleteTask"
]);

const newTask = ref("");
const isEditTitle = ref(false);
const showTaskView = ref(false);
const selectedTaskIndex = ref(-1);
const showAddContent = ref(false);

const addTask = () => {
  showAddContent.value = true;
};

const closeAddContent = () => {
  showAddContent.value = false;
  newTask.value = "";
};

const clickDotsEmit = () => {
  emit("click:dots");
};

// Tasks
const editTaskEmitHandler = (taskIndex, newTaskText) => {
  emit("click:editTask", [taskIndex, newTaskText]);
};

const saveTaskEmit = () => {
  if (newTask.value.trim()) {
    emit("click:saveTask", newTask.value.trim());
    newTask.value = "";
    showAddContent.value = false;
  }
};

// Task view
const openTask = (index) => {
  showTaskView.value = true;
  selectedTaskIndex.value = index;
};

const closeTask = () => {
  showTaskView.value = false;
  selectedTaskIndex.value = -1;
};

const deleteTask = (taskIndex) => {
  emit("click:deleteTask", taskIndex);
};

// Desks
const editTitleEmit = (newTitle) => {
  if (newTitle.trim()) {
    emit("update:title", newTitle.trim());
    isEditTitle.value = false;
  }
};

const clickTitle = () => {
  isEditTitle.value = true;
};

const handleTitleBlur = () => {
  if (isEditTitle.value) {
    editTitleEmit(props.title);
  }
};

const dragStart = (e, task, oldIndex) => {
  e.dataTransfer.setData("task", JSON.stringify(task));
  e.dataTransfer.setData("oldTaskIndex", oldIndex);
  e.target.classList.add("dragging");
};

const dragEnd = (e) => {
  e.target.classList.remove("dragging");
};

const drop = (e, newIndex) => {
  const oldIndex = e.dataTransfer.getData("oldTaskIndex");
  const task = JSON.parse(e.dataTransfer.getData("task"));
  emit("drop:task", [oldIndex, newIndex, task]);
};
</script>

<template>
  <div
    :draggable="true"
    @dragenter.prevent
    @dragover.prevent
    class="desk-column"
    :style="{ 'background-color': bgc }"
  >
    <div class="desk-column__header">
      <div class="desk-column__title">
        <h3
          v-if="!isEditTitle"
          class="title is-6"
          @dblclick="clickTitle"
          v-text="title"
        />

        <b-input
          v-else
          :model-value="title"
          size="is-small"
          autofocus
          @blur="handleTitleBlur"
          @update:model-value="editTitleEmit($event)"
          @keyup.enter="editTitleEmit(title)"
        />

        <b-dropdown position="is-bottom-left" aria-role="menu" class="desk-column__menu">
          <template #trigger>
            <b-button size="is-small" icon-right="dots-vertical" type="is-text" />
          </template>

          <b-dropdown-item aria-role="menuitem" @click="clickDotsEmit">
            <span>Действия</span>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <div class="desk-column__tasks">
      <template v-for="(task, index) in tasks" :key="index">
        <Task
          :draggable="true"
          :task="task.task"
          class="task-item"
          @dragstart.stop="dragStart($event, task, index)"
          @drop.stop="drop($event, index)"
          @dragend="dragEnd($event)"
          @click:editTask.stop="editTaskEmitHandler(index, $event)"
          @click.stop="openTask(index)"
        />
      </template>

      <b-modal
        v-model="showTaskView"
        :title="tasks[selectedTaskIndex]?.task || ''"
        has-modal-card
        trap-focus
        aria-role="dialog"
        aria-modal
      >
        <ViewTask
          v-if="selectedTaskIndex !== -1"
          :task="tasks[selectedTaskIndex]"
          @close="closeTask"
          @delete="deleteTask(selectedTaskIndex)"
        />
      </b-modal>
    </div>

    <div v-if="!showAddContent" class="desk-column__footer">
      <b-button type="is-text" size="is-small" icon-left="plus" expanded @click="addTask">
        {{ $t("column.addTask") }}
      </b-button>
    </div>

    <div v-else class="desk-column__add-task">
      <b-input
        v-model="newTask"
        type="textarea"
        size="is-small"
        placeholder="Введите текст задачи..."
        rows="2"
        autofocus
        @keyup.enter="saveTaskEmit"
      />
      <div class="desk-column__add-task__actions">
        <b-button
          type="is-primary"
          size="is-small"
          :disabled="!newTask.trim()"
          @click="saveTaskEmit"
        >
          Добавить
        </b-button>
        <b-button
          type="is-text"
          size="is-small"
          icon-right="close"
          @click="closeAddContent"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desk-column {
  display: flex;
  flex-direction: column;
  width: 280px;
  min-height: 100px;
  max-height: calc(100vh - 200px);
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &__header {
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 8px;

    h3 {
      flex-grow: 1;
      margin: 0;
      padding: 4px 8px;
      font-weight: 600;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }

    .dropdown {
      margin-left: auto;
    }
  }

  &__tasks {
    flex-grow: 1;
    overflow-y: auto;
    padding: 4px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .task-item {
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      &.dragging {
        opacity: 0.5;
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

  &__footer {
    button {
      display: flex;
      justify-content: flex-start;
      color: #666;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
        color: #000;
      }
    }
  }

  &__add-task {
    display: flex;
    flex-direction: column;
    gap: 8px;

    textarea {
      min-height: 60px;
      resize: vertical;
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: 8px;

      button:first-child {
        flex-grow: 1;
      }
    }
  }
}

.task-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.task-drag {
  opacity: 0;
}
</style>
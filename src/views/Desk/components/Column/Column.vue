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
    type: Array
  },
  bgc: {
    required: false,
    type: String
  }
});

const emit = defineEmits([
  "click:dots",
  "click:saveTask",
  "click:editTask",
  "click:editTitle",
  "drop:task",
  "click:deleteTask"
]);

let newTask = ref("");
let isEditTitle = ref(false);
let showTaskView = ref(false);
let selectedTaskIndex = ref(-1);

let showAddContent = ref(false);
const addTask = () => {
  showAddContent.value = !showAddContent.value;
};

const closeAddContent = () => {
  showAddContent.value = false;
};

const clickDotsEmit = () => {
  emit("click:dots");
};

// Tasks
const editTaskEmitHandler = (taskIndex, newTaskText) => {
  emit("click:editTask", [taskIndex, newTaskText]);
};

const saveTaskEmit = () => {
  showAddContent.value = false;
  emit("click:saveTask", newTask.value);
  newTask.value = "";
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

//Desks
const editTitleEmit = (newTitle) => {
  emit("click:editTitle", [newTitle, props.title]);
};

const clickTitle = () => {
  isEditTitle.value = true;
};

const dragStart = (e, task, oldIndex) => {
  e.dataTransfer.setData("task", JSON.stringify(task));
  e.dataTransfer.setData("oldTaskIndex", oldIndex);

  setTimeout(() => {
    e.target.style.display = "none"; // provides hiding when drag event starts
  });
};

const dragEnd = (e) => {
  setTimeout(() => {
    e.target.style.display = "flex";
  });
};

const drop = (e, newIndex) => {
  let oldIndex = e.dataTransfer.getData("oldTaskIndex");
  let task = JSON.parse(e.dataTransfer.getData("task"));
  emit("drop:task", [oldIndex, newIndex, task]);
};
</script>

<template>
  <div
    :draggable="true"
    @dragenter.prevent
    @dragover.prevent
    class="desk-column"
    :style="{ background: bgc }"
  >
    <div class="desk-column__title">
      <div
        v-if="!isEditTitle"
        v-text="title"
        class="desk-column__title--text"
        @dblclick="clickTitle"
      />

      <i-input
        v-else
        :modelValue="title"
        variant="underline"
        @update:modelValue="editTitleEmit($event)"
        @blur="isEditTitle = false"
      />
      <i-button variant="icon" icon-left="mdi-dots-grid" @click="clickDotsEmit" />
    </div>

    <div class="desk-column__tasks">
      <template v-for="(task, index) in tasks" :key="index">
        <Task
          :draggable="true"
          :task="task.task"
          @dragenter.prevent
          @dragover.prevent
          @dragstart.stop="dragStart($event, task, index)"
          @drop.stop="drop($event, index)"
          @dragend="dragEnd($event)"
          @click:editTask.stop="editTaskEmitHandler(index, $event)"
          @click.stop="openTask(index)"
        />

        <i-modal
          v-if="selectedTaskIndex === index"
          v-model="showTaskView"
          :title="task.task"
          size="md"
        >
          <view-task :task="task" @close="closeTask" @delete="deleteTask(index)" />
        </i-modal>
      </template>

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
    cursor: pointer;

    button {
      margin-left: auto;
    }

    &--text {
      user-select: none;
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

<script setup>
import { ref } from "vue";
import Comment from "./Comment.vue";

const props = defineProps({
  task: {
    required: false,
    type: Object
  }
});

const emit = defineEmits(["close", "delete"]);

const close = () => {
  emit("close");
};

const deleteTask = () => {
  emit("delete");
  emit("close");
};
</script>

<template>
  <div class="view-task">
    <div class="view-task-info">
      <div class="view-task__main" v-text="task.task" />
      <div class="view-task__menu">
        <i-button :label="$t('tasks.actions.delete')" block @click="deleteTask" />
      </div>
    </div>
    <div class="view-task__comments">
      <b>Comments</b>
      <Comment
        v-for="(comment, index) in props.task.comments"
        :key="index"
        :user="comment.user"
        :text="comment.text"
        :date="comment.date"
      />
    </div>
  </div>
</template>

<style lang="scss">
.view-task {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .view-task-info {
    display: flex;
    gap: 10px;
    width: 100%;
    min-height: 300px;
  }

  &__main {
    width: 100%;
    background: green;
  }

  &__menu {
    width: 160px;
  }

  &__comments {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 100px;
    font-size: 14px;
  }
}
</style>

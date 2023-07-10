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
  <div class="i-dropdown">
    <div class="i-dropdown-info">
      <div class="i-dropdown__main" v-text="task.task" />
      <div class="i-dropdown__menu">
        <i-button :label="$t('tasks.actions.delete')" block @click="deleteTask" />
      </div>
    </div>
    <div class="i-dropdown__comments">
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
.i-dropdown {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .i-dropdown-info {
    display: flex;
    gap: 10px;
    width: 100%;
    min-height: 300px;
  }

  &__main {
    width: 400px;
    background: green;
  }

  &__menu {
    width: 200px;
    background: blue;
  }

  &__comments {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 600px;
    min-height: 100px;
    font-size: 14px;
  }
}
</style>

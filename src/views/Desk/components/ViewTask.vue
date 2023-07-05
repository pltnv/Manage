<script setup>
import { ref } from "vue";

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
      <div class="i-dropdown__main">{{ props.task.task }}</div>
      <div class="i-dropdown__menu">
        <i-button :label="$t('tasks.actions.delete')" block @click="deleteTask" />
      </div>
    </div>
    <div class="i-dropdown__comments">Comments</div>
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
    width: 600px;
    background: red;
    min-height: 100px;
  }
}
</style>

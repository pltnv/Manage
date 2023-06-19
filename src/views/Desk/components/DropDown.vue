<script setup>
import { ref } from "vue";

const emit = defineEmits(["close", "create"]);

let title = ref("");
let color = ref("");

const close = () => {
  emit("close");
};

const createBoard = () => {
  if (title.value !== "") {
    const newBoard = {
      title: title.value,
      color: "red"
    };
    emit("create", newBoard);
  }
};
</script>

<template>
  <div class="i-drop-down">
    <div class="i-drop-down__header">
      <div v-text="$t('boards.actions.create')" />
      <i class="i-drop-down__header__close mdi mdi-close" @click="close" />
    </div>

    <div>
      <div v-text="$t('boards.enterTitle')" />
      <i-input v-model="title" size="sm" :placeholder="$t('boards.boardTitle')" />
    </div>

    <i-button size="md" @click="createBoard" block :label="$t('boards.actions.create')" />
  </div>
</template>

<style lang="scss">
.i-drop-down {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 1;
  width: 300px;
  min-height: 240px;
  padding: 10px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
  background: white;

  &__header {
    padding-bottom: 10px;
    border-bottom: 0.1px solid rgb(63, 60, 60);

    &__close {
      position: absolute;
      top: 10px;
      right: 6px;
      padding: 4px;
    }
  }

  .i-button {
    margin-top: auto;
  }
}
</style>

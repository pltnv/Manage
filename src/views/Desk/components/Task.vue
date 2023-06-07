<script setup>
defineProps({
  task: {
    required: true,
    type: String
  }
});

const emit = defineEmits(["click:editTask"]);

const editTask = () => {
  emit("click:editTask");
};
</script>

<template>
  <div class="task">
    <div v-text="task" class="task__content" />
    <div class="task__edit">
      <button class="mdi mdi-pencil" @click="editTask" />
    </div>
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

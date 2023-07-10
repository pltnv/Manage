<script setup>
const props = defineProps({
  id: String,
  user: {
    required: true,
    type: String
  },
  src: String,
  text: {
    required: true,
    type: String
  },
  date: {
    required: true,
    type: String
  }
});
</script>

<template>
  <div class="comment" :id="id">
    <div class="main-wrapper">
      <div class="comment__avatar">
        <div v-text="user" />
      </div>
      <div class="comment__text" v-text="text" />
    </div>
    <div class="comment__date" v-text="date" />
  </div>
</template>

<style lang="scss">
.comment {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
  min-height: 40px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;

  .main-wrapper {
    display: flex;
    gap: 8px;
  }

  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-right: 0 auto;
    background-color: green;
    border-radius: 50%;
  }

  &__text {
    width: 500px;
    padding: 4px 2px 10px 2px;
    white-space: wrap;
  }

  &__date {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-size: 10px;
  }
}
</style>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  id: String
});

const emit = defineEmits(["click:exit"]);

let isUserVisible = ref(false);

const clickExit = () => {
  emit("click:exit");
};

const toggleUserInfo = () => {
  isUserVisible.value = !isUserVisible.value;
};
</script>

<template>
  <div class="i-header" :id="props.id">
    <div class="i-header__actions">
      <slot />
    </div>
    <div class="i-header__user">
      <i-button @click="toggleUserInfo" />
      <div v-if="isUserVisible" class="i-header__user__info">
        <i-button label="Выйти" @click="clickExit" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.i-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  width: 100%;
  height: 60px;
  background-color: white;
  padding: 0 20px;

  &__actions {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  &__user {
    &__info {
      position: absolute;
      top: 72px;
      left: -28px;
      display: flex;
      flex-direction: column;
      width: 200px;
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
      background-color: white;
    }
  }
}
</style>

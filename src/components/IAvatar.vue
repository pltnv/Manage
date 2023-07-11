<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  id: String,
  name: String,
  src: String,
  size: {
    type: String,
    default: "md"
  }
});
</script>

<template>
  <div class="i-avatar" :class="[`i-avatar--${size}`]">
    <div v-if="src">Src</div>
    <div v-else>{{ name }}</div>
  </div>
</template>

<style lang="scss">
.i-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(118, 122, 118);
  border-radius: 50%;
  border: 1px solid gray;
  overflow: hidden;

  &--sm {
    width: 20px;
    height: 20px;
  }

  &-md {
    width: 30px;
    height: 30px;
  }
}
</style>

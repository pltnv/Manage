<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  id: String | Number,
  name: String,
  src: String,
  size: {
    type: String,
    default: "md"
  }
});

let inicials = computed(() => "AC");
</script>

<template>
  <div :id="id" class="i-avatar" :class="[`i-avatar--${size}`]">
    <div v-if="src">Src</div>
    <div v-else v-text="inicials" />
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

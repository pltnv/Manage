<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  id: String | Number,
  name: {
    type: String,
    default: "Name Surname 3th"
  },
  src: String,
  size: {
    type: String,
    default: "md",
    validator: (value) => {
      return ["sm", "md"].indexOf(value) !== -1;
    }
  },
  color: String
});

let inicials = computed(() => {
  const nameParts = props.name.split(" ");

  if (nameParts.length === 1) {
    return nameParts[0].substring(0, 2).toUpperCase();
  }

  return nameParts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
});
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
    font-size: 12px;
  }

  &--md {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
}
</style>

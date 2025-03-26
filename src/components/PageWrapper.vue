<script setup>
defineProps({
  class: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div :class="$style.desks">
    <slot></slot>
  </div>
</template>

<style lang="scss" module>
.desks {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  height: 100%;
  background-color: #f8f9fa;
}
</style>
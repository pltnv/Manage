<script setup>
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  color: {
    required: false,
    type: String
  }
});

const emit = defineEmits(["click"]);

const click = () => {
  emit("click");
};
</script>

<template>
  <div
    v-text="props.title"
    class="desk"
    :style="{ backgroundColor: props.color }"
    @click="click"
  />
</template>

<style lang="scss">
.desk {
  overflow: hidden;
  width: 140px;
  min-height: 40px;
  padding: 10px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  white-space: wrap;
  text-overflow: ellipsis;
}
</style>

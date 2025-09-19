<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  colors: {
    type: Array,
    default: () => ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"]
  }
});

const emit = defineEmits(["update:modelValue"]);

const selectedColor = ref(props.modelValue);

const selectColor = (color) => {
  selectedColor.value = color;
  emit("update:modelValue", color);
};
</script>

<template>
  <div :class="$style.colorPicker">
    <div
      v-for="color in colors"
      :key="color"
      :style="{ backgroundColor: color }"
      :class="[$style.option, selectedColor === color && $style.selected]"
      @click="selectColor(color)"
    />
  </div>
</template>

<style lang="scss" module>
.colorPicker {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.option {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

.selected {
  border-color: #1f2937;
  transform: scale(1.1);
}
</style>
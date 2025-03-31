<script setup>
import { computed } from "vue";
import { getContrastTextColor } from "@/utills/getContrastTextColor";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: "#7957d5"
  },
  isActive: {
    type: Boolean,
    default: false
  },
  taskCount: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(["click", "contextmenu"]);

const textColor = computed(() => getContrastTextColor(props.color));

const handleClick = (e) => {
  emit("click", e);
};

const handleContextMenu = (e) => {
  e.preventDefault();
  emit("contextmenu", e);
};
</script>

<template>
  <div
    class="desk"
    :style="{
      backgroundColor: props.color,
      color: textColor,
      border: isActive ? `2px solid ${textColor}` : 'none'
    }"
    @click="handleClick"
    @contextmenu="handleContextMenu"
    :title="title"
    tabindex="0"
    @keydown.enter="handleClick"
  >
    <span class="desk-title">{{ title }}</span>
    <span v-if="taskCount > 0" class="task-counter">
      {{ taskCount }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.desk {
  --hover-elevation: 0 4px 8px rgba(0, 0, 0, 0.15);
  --active-elevation: 0 2px 4px rgba(0, 0, 0, 0.1);

  position: relative;
  overflow: hidden;
  width: 180px;
  min-height: 100px;
  padding: 16px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  box-shadow: var(--active-elevation);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--hover-elevation);
  }

  .desk-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  .task-counter {
    align-self: flex-end;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    padding: 2px 8px;
    font-size: 0.85rem;
    font-weight: 500;
    backdrop-filter: blur(4px);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0) 60%
    );
    pointer-events: none;
  }
}
</style>
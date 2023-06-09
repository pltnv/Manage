<script setup>
import { computed } from "vue";

const props = defineProps({
  id: String,
  label: String,
  color: String,
  type: {
    type: String,
    default: "button",
    validator: (value) => {
      return ["button", "submit", "reset"].indexOf(value) !== -1;
    }
  },
  round: String,
  rounded: Boolean,
  size: {
    type: String,
    default: "sm",
    validator: (value) => {
      return ["xs", "sm", "md", "lg", "xl"].indexOf(value) !== -1;
    }
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => {
      return (
        ["default", "flat", "outlined", "text", "plain", "icon"].indexOf(value) !== -1
      );
    }
  },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  ripple: { type: Boolean, default: false },
  iconLeft: String,
  iconRight: String,
  iconRightColor: String,
  iconLeftColor: String
});

const emit = defineEmits(["click"]);

const classes = computed(() => {
  return {
    "i-button--block": props.block,
    "i-button--rounded": props.rounded,
    [`i-button--${props.size}`]: true,
    [`i-button--${props.variant}`]: true
  };
});

const handleClick = () => {
  emit("click");
};
</script>

<template>
  <button
    display="inline-block"
    :id="id"
    :type="type"
    :disabled="disabled"
    class="i-button"
    :class="classes"
    :style="{ color: color, borderRadius: round }"
    @click="handleClick"
  >
    <div>
      <i
        v-if="iconLeft"
        class="mdi i-button__icon--left"
        :class="iconLeft"
        :style="{ color: iconLeftColor }"
      />

      <span v-if="label" class="i-button__label" v-text="label" />

      <i
        v-if="iconRight"
        class="mdi i-button__icon--right"
        :class="iconRight"
        :style="{ color: iconRightColor }"
      ></i>
    </div>
  </button>
</template>

<style lang="scss">
.i-button {
  display: block;
  padding: 10px;
  width: 140px; // to fix
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border: none;
  cursor: pointer;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &--block {
    width: 100%;
    justify-content: center;
  }

  &--xs {
    height: 20px;

    &.i-button--icon {
      width: 20px;
    }
  }

  &--sm {
    height: 28px;

    &.i-button--icon {
      width: 28px;
    }
  }

  &--md {
    height: 36px;

    &.i-button--icon {
      width: 36px;
    }
  }

  &--lg {
    height: 44px;

    &.i-button--icon {
      width: 44px;
    }
  }

  &--xl {
    height: 52px;

    &.i-button--icon {
      width: 52px;
    }
  }

  &--icon {
    border: none;
    box-shadow: none;
  }

  &--rounded {
    border-radius: 10px;
  }

  &--flat {
    background-color: transparent;
    transition: background-color 0.3s ease;

    &:hover {
      opacity: 0.6;
    }
  }

  &--outlined {
    box-shadow: none;
    border: 1px solid gray;

    &:hover {
      opacity: 0.6;
    }
  }

  &--text {
    border: none;
    box-shadow: none;
  }

  &:hover {
    background: rgb(237, 235, 235);
  }

  &--plain {
    border: none;
    box-shadow: none;

    &:hover {
      background: none;
    }
  }

  &:disabled {
    pointer-events: none;
    background: none;
    opacity: 0.5;
  }

  &__icon-left {
    color: red;
  }

  &__label {
    flex-grow: 1;
    text-align: center;
  }
}
</style>

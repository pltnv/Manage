<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  id: String,
  name: String,
  modelValue: {
    required: true,
    type: String
  },
  autofocus: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  maxlength: String,
  placeholder: String,
  required: Boolean,
  showError: Boolean,
  error: String,
  label: String,
  variant: {
    type: String,
    default: "default",
    validator: (value) => {
      return ["default", "outlined", "underline"].indexOf(value) !== -1;
    }
  },
  size: {
    type: String,
    default: "sm",
    validator: (value) => {
      return ["xs", "sm", "md"].indexOf(value) !== -1;
    }
  },
  type: {
    type: String,
    default: "text",
    validator: (value) => {
      return ["text", "phone", "email", "password", "number"].indexOf(value) !== -1;
    }
  },
  clearable: Boolean,
  count: Boolean,
  error: Boolean,
  errorMessage: String,
  block: Boolean
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

let localValue = ref(props.modelValue);
let localType = ref(props.type);
let showPassword = ref(false);

let amount = computed(() => localValue.value.length);
let isTypePassword = computed(() => props.type === "password");

let passwordIcon = computed(() => {
  if (isTypePassword && localType.value === "password") {
    return "mdi-eye-outline";
  }

  if (isTypePassword && localType.value === "text") {
    return "mdi-eye-off-outline";
  }
});

let classes = computed(() => {
  return [
    `i-input__wrapper--${props.variant}`,
    {
      error: props.error && !props.disabled,
      "i-input--disabled": props.disabled,
      "i-input--block": props.block
    }
  ];
});

let updateValue = (newValue) => {
  emit("update:modelValue", newValue);
};

let handleBlur = () => {
  emit("blur");
};

let handleFocus = () => {
  emit("focus");
};

let clear = () => {
  localValue.value = "";
};

let toggleShowPassword = () => {
  if (isTypePassword.value && props.type === localType.value) {
    localType.value = "text";
    return;
  }

  if (isTypePassword.value && props.type !== localType.value) {
    localType.value = "password";
    return;
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);
</script>

<template>
  <div class="i-input">
    <div class="i-input__label">
      <div v-if="label" v-text="label" />
      <sup v-if="required">*</sup>
    </div>
    <div class="i-input__wrapper" :class="classes">
      <input
        :value="localValue"
        :maxlength="maxlength"
        :autofocus="autofocus"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        :readonly="readonly"
        :type="localType"
        @blur="handleBlur"
        @input="updateValue($event.target.value)"
        @focus="handleFocus"
      />
      <div v-if="clearable && localValue.length && !disabled && !readonly">
        <i class="mdi mdi-close" @click="clear" />
      </div>

      <div class="info">
        <span v-if="count && amount > 0" v-text="amount" />
        <span v-if="count && maxlength"> / </span>
        <span v-if="maxlength" v-text="maxlength" />
      </div>
      <div v-if="isTypePassword && !disabled">
        <i class="mdi" :class="passwordIcon" @click="toggleShowPassword" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.i-input {
  width: 280px;

  &--block {
    width: 100%;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    position: relative;
    width: 100%;
    height: px;
    padding: 6px;
    border: 1px solid transparent;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;

    &.error {
      border: 1px solid;
      border-color: rgb(242, 48, 48);
      box-shadow: none;
    }

    &--outlined {
      border: 1px solid gray;
      box-shadow: none;

      &:focus {
        border: none;
      }

      &:hover {
        border: 1px solid black;
      }

      &.error {
        border-color: rgb(242, 48, 48);
      }
    }

    &--underline {
      border-bottom: 1px solid gray;
      border-radius: 0;
      box-shadow: none;

      :focus-within {
        border-color: black;
      }

      &:hover {
        border-bottom: 1px solid black;
      }

      &.error {
        border: none;
        border-bottom: 1px solid rgb(242, 48, 48);
      }
    }

    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &--readonly {
      pointer-events: none;
    }

    input {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      overflow: hidden;
      white-space: nowrap;
    }

    .clear {
      border: none;
      background: none;
      cursor: pointer;
    }

    .info {
      display: flex;
      align-items: center;
      color: #676161;
    }

    i {
      cursor: pointer;
    }
  }
}
</style>

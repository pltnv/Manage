<script setup>
import { ref } from "vue";
import ColorPicker from "./ColorPicker.vue";

const emit = defineEmits(["close", "create"]);

const title = ref("");
const color = ref("#ef4444");
const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const closeModal = () => {
  emit("close");
};

const handleCreate = () => {
  if (!title.value.trim()) return;

  emit("create", {
    title: title.value.trim(),
    color: color.value
  });
};
</script>

<template>
  <div :class="$style.boardCreateModal">
    <div :class="$style.modalHeader">
      <h3 :class="$style.modalTitle">{{ $t("boards.actions.create") }}</h3>
      <b-button size="is-small" type="is-light" icon-right="close" @click="closeModal" />
    </div>

    <div :class="$style.modalContent">
      <div :class="$style.formGroup">
        <label :class="$style.formLabel">{{ $t("boards.enterTitle") }}</label>
        <b-input
          v-model="title"
          :placeholder="$t('boards.boardTitle')"
          @keyup.enter="handleCreate"
        />
      </div>

      <div :class="$style.formGroup">
        <label :class="$style.formLabel"> {{ $t("boards.newBoard.chooseColor") }}</label>
        <ColorPicker v-model="color" :colors="colors" />
      </div>
    </div>

    <div :class="$style.modalFooter">
      <button :class="$style.createBtn" @click="handleCreate" :disabled="!title.trim()">
        {{ $t("boards.actions.create") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" module>
.boardCreateModal {
  display: flex;
  flex-direction: column;
  width: 340px;
  background: #aa9b9b;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.modalHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #f3f4f6;
  background-color: #f9fafb;
}

.modalTitle {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.modalContent {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.formLabel {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.modalFooter {
  padding: 16px 20px;
  border-top: 1px solid #f3f4f6;
  background-color: #f9fafb;
  display: flex;
}

.createBtn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  background-color: #6366f1;
  color: white;

  &:hover {
    background-color: #4f46e5;
  }

  &:active {
    background-color: #4338ca;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
    color: #9ca3af;
  }
}
</style>
<template>
  <div :class="$style.addColumnContainer">
    <button
      v-if="!isAddingColumn"
      :class="$style.addColumnButton"
      @click="startAddingColumn"
    >
      <span :class="$style.plusIcon">+</span> Добавить колонку
    </button>

    <div v-else :class="$style.addColumnForm">
      <b-input
        ref="columnInput"
        v-model="newColumnTitle"
        :class="$style.columnInput"
        placeholder="Введите название колонки"
        autofocus
        @keyup.enter="addColumn"
      />
      <div :class="$style.addColumnActions">
        <b-button
          :class="$style.saveButton"
          type="is-primary"
          size="is-small"
          @click="addColumn"
          :disabled="!newColumnTitle.trim()"
        >
          Добавить
        </b-button>
        <b-button
          :class="$style.cancelButton"
          type="is-text"
          size="is-small"
          @click="cancelAddingColumn"
        >
          <span :class="$style.closeIcon">×</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const emit = defineEmits(["add-column"]);

const isAddingColumn = ref(false);
const newColumnTitle = ref("");
const columnInput = ref(null);

const startAddingColumn = async () => {
  isAddingColumn.value = true;
  await nextTick();
  columnInput.value?.focus();
};

const addColumn = () => {
  if (newColumnTitle.value.trim()) {
    emit("add-column", newColumnTitle.value.trim());
    newColumnTitle.value = "";
    isAddingColumn.value = false;
  }
};

const cancelAddingColumn = () => {
  isAddingColumn.value = false;
  newColumnTitle.value = "";
};
</script>

<style lang="scss" module>
.addColumnContainer {
  min-width: 280px;
  width: 280px;
  height: fit-content;
}

.addColumnButton {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: rgba(9, 30, 66, 0.04);
  border: none;
  border-radius: 4px;
  color: #5e6c84;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
}

.plusIcon {
  font-size: 18px;
  margin-right: 8px;
}

.addColumnForm {
  background: #ebecf0;
  padding: 8px;
  border-radius: 4px;
}

.columnInput {
  margin-bottom: 8px;

  :global(.input) {
    padding: 8px 12px;
    font-size: 14px;
  }
}

.addColumnActions {
  display: flex;
  align-items: center;
}

.saveButton {
  margin-right: 8px;
  flex-grow: 1;
}

.cancelButton {
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.closeIcon {
  font-size: 20px;
  line-height: 1;
}
</style>
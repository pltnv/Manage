import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const usePersonalTaskStore = defineStore("personalTaskStore", () => {
  let columns = ref([]);

  // Boards

  const addBoard = (title) => {
    console.log(title);
    const newBoard = {
      title,
      tasks: []
    };
    columns.value.push(newBoard);
  };

  const removeBoard = (id) => {
    const index = columns.value.findIndex((board, i) => i === id);

    if (index !== -1) {
      columns.value.splice(index, 1);
    }
  };

  // Tasks

  const addTask = (task, i) => {
    const board = columns.value.find((_, idx) => i === idx);

    if (board) {
      columns.value[i].tasks.push(task);
    }
  };

  const removeTask = (taskId, boardId) => {
    const board = columns.value.find((_, idx) => idx === boardId);

    if (board) {
      const index = columns.value[boardId].tasks.findIndex((_, idx) => idx === taskId);

      if (index !== -1) {
        columns.value[boardId].tasks.splice(index, 1);
      }
    }
  };

  // get data from LS
  if (localStorage.getItem("columns")) {
    columns.value = JSON.parse(localStorage.getItem("columns"));
  }

  watch(
    () => columns,
    (state) => {
      localStorage.setItem("columns", JSON.stringify(state.value));
    },
    { deep: true }
  );

  return {
    columns,
    addBoard,
    removeBoard,
    addTask,
    removeTask
  };
});

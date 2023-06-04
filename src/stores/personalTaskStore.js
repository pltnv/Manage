import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const usePersonalTaskStore = defineStore("personalTaskStore", () => {
  let columns = ref([]);

  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

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
      columns.value.tasks.push(task);
    }
  };

  const removeTask = (boardId, taskId) => {
    const board = columns.value.find((board) => board.id === boardId);

    if (board) {
      const index = columns.value.tasks.findIndex((task) => task.id === taskId);

      if (index !== -1) {
        columns.value.tasks.splice(index, 1);
      }
    }
  };

  // get data from LS
  if (localStorage.getItem("columns")) {
    console.log(localStorage.getItem("columns"));
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
    count,
    doubleCount,

    increment,
    addBoard,
    removeBoard,
    addTask,
    removeTask
  };
});

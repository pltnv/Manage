import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@/composable/useLocalStorage";

export const usePersonalTaskStore = defineStore("personalTaskStore", () => {
  let boards = ref([
    {
      title: "University",
      desks: [
        { title: "To do", tasks: ["Learn the poem", "Make a presentation"] },
        { title: "In progress", tasks: ["Solve the task"] }
      ]
    },
    {
      title: "Work",
      desks: [
        { title: "To do", tasks: ["Implement postgress"] },
        { title: "In progress", tasks: ["Add scss to project"] }
      ]
    }
  ]);

  // mock data
  let columns = ref([
    { title: "Учеба", tasks: [] },
    { title: "Уник", tasks: [] },
    { title: "Учеба", tasks: [] },
    { title: "Уник", tasks: [] },
    { title: "Учеба", tasks: [] },
    { title: "Уник", tasks: [] },
    { title: "Учеба", tasks: [] },
    { title: "Уник", tasks: [] }
  ]);

  // Boards

  const addBoard = (title) => {
    console.log(title);
    const newBoard = {
      title,
      desks: []
    };
    boards.value.push(newBoard);
  };

  const removeBoard = (id) => {
    const index = boards.value.findIndex((_, i) => i === id);

    if (index !== -1) {
      boards.value.splice(index, 1);
    }
  };

  // Tasks

  const addTask = (boardIndex, deskIndex, task) => {
    boards.value[boardIndex].desks[deskIndex].tasks.push(task);
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

  useLocalStorage(boards, "boards", true);

  return {
    boards,
    columns,
    addBoard,
    removeBoard,
    addTask,
    removeTask
  };
});

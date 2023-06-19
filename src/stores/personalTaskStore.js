import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@/composable/useLocalStorage";

export const usePersonalTaskStore = defineStore("personalTaskStore", () => {
  // Using initial mock data to fill the app due to the lack of a backend ;)
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

  // Boards

  const addBoard = (newBoard) => {
    boards.value.push(newBoard);
  };

  const removeBoard = (boardId) => {
    const index = boards.value.findIndex((_, i) => i === boardId);

    if (index !== -1) {
      boards.value.splice(index, 1);
    }
  };

  const renameBoard = (boardId, newTitle) => {
    const index = boards.value.findIndex((_, i) => i === boardId);

    if (index !== -1) {
      boards.value[boardId].title = newTitle;
    }
  };

  // Desks

  const addDesk = (boardIndex, deskTitle) => {
    const newDesk = {
      title: deskTitle,
      tasks: []
    };
    boards.value[boardIndex].push(newDesk);
  };

  const removeDesk = (boardIndex, deskIndex) => {
    const index = boards.value[boardIndex].desks.findIndex((_, i) => i === deskIndex);

    if (index !== -1) {
      boards.value[boardIndex].desks.splice(deskIndex, 1);
    }
  };

  const renameDesk = (boardIndex, deskIndex, newTitle) => {
    const index = boards.value[boardIndex].desks.findIndex((_, i) => i === deskIndex);

    if (index !== -1) {
      boards.value[boardIndex].desks[deskIndex].title = newTitle;
    }
  };

  // Tasks

  const addTask = (boardIndex, deskIndex, task) => {
    boards.value[boardIndex].desks[deskIndex].tasks.push(task);
  };

  const removeTask = (boardId, deskIndex, taskIndex) => {
    const index = boards.value[boardId].desks[deskIndex].tasks.findIndex(
      (_, idx) => idx === taskIndex
    );

    if (index !== -1) {
      boards.value[boardId].desks[deskIndex].tasks.splice(index, 1);
    }
  };

  const editTask = (boardIndex, deskIndex, taskIndex, newText) => {
    boards.value[boardIndex].desks[deskIndex].tasks.splice(taskIndex, 1, newText);
  };

  useLocalStorage(boards, "boards", true);

  return {
    boards,
    addBoard,
    removeBoard,
    renameBoard,
    addDesk,
    removeDesk,
    renameDesk,
    addTask,
    removeTask,
    editTask
  };
});

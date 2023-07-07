import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@/composable/useLocalStorage";

export const usePersonalTaskStore = defineStore("personalTaskStore", () => {
  // Using initial mock data to fill the app due to the lack of a backend ;)
  let boards = ref([
    {
      title: "University",
      desks: [
        {
          title: "To do",
          tasks: [
            {
              task: "Learn the poem",
              date: "18.06.2023, 18:30:19",
              comments: [
                {
                  user: "LK",
                  text: "Delete something  fgewhfghwuiegtu43ht ui34htu 34tu34 gh34 ugh43ghth23uithi43hgiu34hgui34hgu i4th4u h34uig  43uihgui43hgui34hguih 4 guh uh hrugiherughu4hui uh urhui3hu4hu34hurhuhuh93u4huerhuirehu34hurhu",
                  date: "29.06.2023, 18:36:19"
                },
                {
                  user: "AP",
                  text: "Add to cart ",
                  date: "30.06.2023, 18:36:19"
                }
              ]
            },
            { task: "Make a presentation", date: "18.06.2023, 18:36:19", comments: [] }
          ]
        },
        {
          title: "In progress",
          tasks: [{ task: "Solve the task", date: "18.06.2023, 18:49:19", comments: [] }]
        }
      ],
      date: "18.06.2023, 18:05:19",
      color: "green"
    },
    {
      title: "Work",
      desks: [
        {
          title: "To do",
          tasks: [
            { task: "Implement postgress", date: "19.06.2023, 18:10:19", comments: [] }
          ]
        },
        {
          title: "In progress",
          tasks: [
            { task: "Add scss to project", date: "19.06.2023, 18:40:19", comments: [] }
          ]
        }
      ],
      date: "19.06.2023, 18:05:19",
      color: "blue"
    }
  ]);

  // Boards

  const addBoard = (newBoard) => {
    boards.value.push({ ...newBoard, desks: [], date: new Date().toLocaleString() });
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
      tasks: [],
      comments: []
    };
    boards.value[boardIndex].push(newDesk);
  };

  const removeDesk = (boardIndex, deskIndex) => {
    const index = boards.value[boardIndex].desks.findIndex((_, i) => i === deskIndex);

    if (index !== -1) {
      boards.value[boardIndex].desks.splice(deskIndex, 1);
    }
  };

  const renameDesk = (boardIndex, oldTitle, newTitle) => {
    const index = boards.value[boardIndex].desks.findIndex(
      (desk) => desk.title === oldTitle
    );

    if (index > -1) {
      boards.value[boardIndex].desks[index].title = newTitle;
    }
  };

  // Tasks

  const addTask = (boardIndex, deskIndex, taskText) => {
    boards.value[boardIndex].desks[deskIndex].tasks.push({
      task: taskText,
      date: new Date().toLocaleString()
    });
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
    boards.value[boardIndex].desks[deskIndex].tasks[taskIndex].task = newText;
  };

  // Drag&drop for tasks
  const moveTask = (boardIndex, newDeskIndex, oldTaskIndex, task, newTaskIndex) => {
    const oldDeskIndex = boards.value[boardIndex].desks.findIndex((desk) =>
      desk.tasks.some((t) => t.text === task.text && t.date === task.date)
    );

    if (newDeskIndex === oldDeskIndex && newTaskIndex !== undefined) {
      boards.value[boardIndex].desks[oldDeskIndex].tasks.splice(oldTaskIndex, 1);
      boards.value[boardIndex].desks[oldDeskIndex].tasks.splice(newTaskIndex, 0, task);
      return;
    }

    if (newDeskIndex !== oldDeskIndex) {
      boards.value[boardIndex].desks[oldDeskIndex].tasks.splice(oldTaskIndex, 1);

      if (newTaskIndex !== undefined) {
        boards.value[boardIndex].desks[newDeskIndex].tasks.splice(newTaskIndex, 0, task);
      } else {
        boards.value[boardIndex].desks[newDeskIndex].tasks.push(task);
      }
      return;
    }
  };

  // Drag&drop for desks
  const moveDesk = (boardIndex, newDeskIndex, oldDeskIndex) => {
    const desk = boards.value[boardIndex].desks[oldDeskIndex];

    boards.value[boardIndex].desks.splice(oldDeskIndex, 1);
    boards.value[boardIndex].desks.splice(newDeskIndex, 0, desk);
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
    editTask,
    moveTask,
    moveDesk
  };
});

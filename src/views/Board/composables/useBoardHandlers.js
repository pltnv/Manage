export function useBoardHandlers(personalTaskStore, currentBoardIndex) {
  const clickEditEmit = (deskIndex, newTask) => {
    const [taskIndex, newTaskText] = newTask;
    personalTaskStore.editTask({
      boardIndex: currentBoardIndex.value,
      deskIndex,
      taskIndex,
      newText: newTaskText
    });
  };

  const saveTaskEmit = (deskIndex, newTaskText) => {
    if (newTaskText) {
      personalTaskStore.addTask({
        boardIndex: currentBoardIndex.value,
        deskIndex,
        taskText: newTaskText
      });
    }
  };

  const editTitleEmit = (newTitle) => {
    const [newTitleText, oldTitle] = newTitle;
    personalTaskStore.renameDesk({
      boardIndex: currentBoardIndex.value,
      oldTitle,
      newTitle: newTitleText
    });
  };

  const deleteTaskEmit = (deskIndex, taskIndex) => {
    personalTaskStore.removeTask({
      boardId: currentBoardIndex.value,
      deskIndex,
      taskIndex
    });
  };

  const dropTaskHandler = (e, deskIndex) => {
    const [oldIndex, newIndex, task] = e;
    personalTaskStore.moveTask({
      boardIndex: currentBoardIndex.value,
      newDeskIndex: deskIndex,
      oldTaskIndex: oldIndex,
      task,
      newTaskIndex: newIndex
    });
  };

  const dropHandler = (e, deskIndex) => {
    try {
      const oldDeskIndex = e.dataTransfer.getData("deskOldIndex");
      personalTaskStore.moveDesk({
        boardIndex: currentBoardIndex.value,
        newDeskIndex: deskIndex,
        oldDeskIndex
      });
    } catch (e) {
      console.warn(e);
    }
  };

  const dragHandler = (e, deskIndex) => {
    e.dataTransfer.setData("deskOldIndex", deskIndex);
  };

  const deleteColumn = (columnIndex) => {
    personalTaskStore.removeDesk({
      boardIndex: currentBoardIndex.value,
      deskIndex: columnIndex
    });
  };

  return {
    clickEditEmit,
    saveTaskEmit,
    editTitleEmit,
    deleteTaskEmit,
    dropTaskHandler,
    dropHandler,
    dragHandler,
    deleteColumn
  };
}

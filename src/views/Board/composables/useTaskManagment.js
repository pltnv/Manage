import { ref } from "vue";

export function useTaskManagement(emit) {
  const newTask = ref("");
  const showAddContent = ref(false);

  const addTask = () => {
    showAddContent.value = true;
  };

  const closeAddContent = () => {
    showAddContent.value = false;
    newTask.value = "";
  };

  const saveTask = () => {
    if (newTask.value.trim()) {
      emit("click:saveTask", newTask.value.trim());
      newTask.value = "";
      showAddContent.value = false;
    }
  };

  return {
    newTask,
    showAddContent,
    addTask,
    closeAddContent,
    saveTask
  };
}

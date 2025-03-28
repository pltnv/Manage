import { ref } from "vue";

export function useTaskView() {
  const showTaskView = ref(false);
  const selectedTaskIndex = ref(-1);

  const openTask = (index) => {
    showTaskView.value = true;
    selectedTaskIndex.value = index;
  };

  const closeTask = () => {
    showTaskView.value = false;
    selectedTaskIndex.value = -1;
  };

  return {
    showTaskView,
    selectedTaskIndex,
    openTask,
    closeTask
  };
}

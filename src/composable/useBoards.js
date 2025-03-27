import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePersonalTaskStore } from "@/stores/personalTaskStore";

export function useBoards() {
  const route = useRoute();
  const personalTaskStore = usePersonalTaskStore();
  
  // add storeToRefs thing
  const { boards } = personalTaskStore;

  const currentBoardIndex = computed(() => route.params.id);
  const boardName = computed(() => route.query?.board);

  return {
    currentBoardIndex,
    boardName,
    boards
  };
}

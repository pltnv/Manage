import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notificationStore", () => {
  let notifications = ref([]);

  const addNotification = (message, type, timeout) => {
    const id = new Date();
    notifications.value.push({ id, message, type });

    if (timeout) {
      setTimeout(() => {
        removeNotification(id);
      }, timeout);
    }
  };

  const removeNotification = (id) => {
    const index = notifications.value.findIndex((notification) => notification.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  return {
    notifications,
    addNotification,
    removeNotification
  };
});

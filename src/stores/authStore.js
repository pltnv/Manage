import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  let user = ref({});
  let isAuthorized = computed(() => true); // to fix

  const login = async ({ login, password }) => {
    // request
  };

  const logout = async () => {
    try {
      // await smth
    } finally {
      user.value = null;
      await router.push({ name: "Login" });
    }
  };

  return {
    user,
    isAuthorized,
    login,
    logout
  };
});

import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const router = useRouter();

  let user = ref({});
  let isAuthorized = ref(false);

  const login = async (login, password) => {
    login !== "" && password !== ""
      ? ((isAuthorized.value = true), (user.value = { login: login, password: password }))
      : (isAuthorized.value = false);
  };

  const logout = async () => {
    try {
      isAuthorized.value = false;
      user.value = {};
    } finally {
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

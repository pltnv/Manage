<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

let name = ref("");
let password = ref("");

const login = async () => {
  await authStore.login(name.value, password.value);
  router.push({ name: "Main" });
};
</script>

<template>
  <div class="login">
    <div v-text="$t('login.appeal')" />

    <input v-model="name" />
    <input v-model="password" />

    <i-button @click="login" :label="$t('login.login')" />
  </div>
</template>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 460px;
  height: 300px;
  padding: 14px;
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 3px;
  gap: 30px;
}
</style>

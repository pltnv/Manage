<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const router = useRouter();
const authStore = useAuthStore();

let name = ref("");
let password = ref("");

const rules = {
  name: { required }, // fix label to email and update rule
  password: { required }
};

const v$ = useVuelidate(rules, { name, password });

const login = async () => {
  const res = await v$.value.$validate();

  if (!res) {
    console.log("You messed up");
    return;
  }
  await authStore.login(name.value, password.value);
  await router.push({ name: "Main" });
};
</script>

<template>
  <div class="login">
    <h1 v-text="$t('login.title')" />

    <i-input v-model="name" :error="v$.name.$invalid && v$.$dirty" />
    <i-input v-model="password" :error="v$.password.$invalid && v$.$dirty" />

    <i-button @click="login" :label="$t('login.login')" />
    <router-link :to="{ name: 'Register' }">{{ $t("register.signup") }}</router-link>
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

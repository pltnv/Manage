<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required, sameAs } from "@vuelidate/validators";

const router = useRouter();
const authStore = useAuthStore();

let mail = ref("");
let password = ref("");
let passwordConfirm = ref("");

const rules = {
  mail: { required, email },
  password: { required, minLength: minLength(5) },
  passwordConfirm: { required, sameAs: sameAs(password) }
};

const v$ = useVuelidate(rules, { mail, password, passwordConfirm });

const register = async () => {
  const res = await v$.value.$validate();

  if (!res) {
    console.log("You messed up with sign up");
    return;
  }
  console.log("Success");
};
</script>

<template>
  <div class="registration">
    <div v-text="$t('register.appeal')" />

    <input v-model="mail" />
    <input v-model="password" />
    <input v-model="passwordConfirm" />

    <i-button @click="register" :label="$t('register.signup')" />
  </div>
</template>

<style lang="scss">
.registration {
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

<script setup>
import IHeader from "../components/IHeader.vue";
import { useAuthStore } from "../stores/authStore";
import { useI18nStore } from "../stores/i18nStore";

const authStore = useAuthStore();
const i18n = useI18nStore();

const { toggleLocale } = useI18nStore;

const logout = async () => {
  await authStore.logout();
};
</script>

<template>
  <div class="account-layout">
    <n-header @click:exit="logout">
      <template>
        <i-button variant="icon" size="md" icon-left="mdi-web" @click="toggleLocale" />
        <i-button variant="icon" size="md" icon-left="mdi-brightness-6" />
      </template>
    </n-header>

    <router-view />
  </div>
</template>

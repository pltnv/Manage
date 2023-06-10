<script setup>
import IHeader from "../components/IHeader.vue";
import { useAuthStore } from "../stores/authStore";
import { useI18nStore } from "../stores/i18nStore";

const authStore = useAuthStore();
const i18n = useI18nStore();

const { toggleLocale } = i18n;

const logout = async () => {
  await authStore.logout();
};
</script>

<template>
  <div class="account-layout">
    <i-header @click:exit="logout">
      <i-button
        variant="icon"
        size="md"
        class="icon"
        icon-left="mdi-web"
        @click="toggleLocale"
      />
      <i-button variant="icon" size="md" icon-left="mdi-brightness-6" class="icon" />
    </i-header>

    <main>
      <router-view />
    </main>
  </div>
</template>

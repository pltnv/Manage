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

    <div class="content-wrapper">
      <aside class="menu">Menu</aside>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
.content-wrapper {
  display: flex;
  gap: 4px;
  padding: 20px 16px;
  height: calc(100vh - 60px);
}
.menu {
  min-width: 20%;
}

main {
  height: calc(100vh - 200px);
  width: 100%;
}
</style>

<script setup>
import IHeader from "../components/IHeader.vue";

import { useI18nStore } from "../stores/i18nStore";

const i18n = useI18nStore();

const { toggleLocale } = i18n;
</script>

<template>
  <div class="account-layout">
    <i-header>
      <b-button icon-right="translate" rounded size="is-small" @click="toggleLocale" />
      <b-button icon-right="brightness-6" rounded size="is-small" />
    </i-header>

    <div class="content-wrapper">
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
  width: 100%;
}
</style>

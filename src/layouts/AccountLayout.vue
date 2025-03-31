<script setup>
import IHeader from "../components/IHeader.vue";
import { useI18nStore } from "../stores/i18nStore";

const i18n = useI18nStore();
const { toggleLocale } = i18n;
</script>

<template>
  <div>
    <i-header>
      <b-button icon-right="translate" rounded size="is-small" @click="toggleLocale" />
    </i-header>

    <main :class="$style.contentWrapper">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" module>
.contentWrapper {
  padding: 20px 16px;
  height: calc(100vh - 60px);
  width: 100%;
}
</style>

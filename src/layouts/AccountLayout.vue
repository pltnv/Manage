<script setup>
import Header from "../components/Header.vue";
import { useI18nStore } from "../stores/i18nStore";

const i18n = useI18nStore();
const { toggleLocale } = i18n;
</script>

<template>
  <div>
    <Header>
      <b-tooltip
        label="Переключить язык"
        type="is-dark"
        position="is-left"
        size="is-small"
      >
        <b-button icon-right="translate" rounded size="is-small" @click="toggleLocale" />
      </b-tooltip>
    </Header>

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

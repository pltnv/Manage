<template>
  <header :class="$style.header">
    <div :class="$style.headerActions">
      <slot />
    </div>
  </header>
</template>

<style lang="scss" module>
.header {
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 0 24px;
  gap: 70px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.4);
}

.headerActions {
  display: flex;
  align-items: center;
  gap: 14px;
}
</style>

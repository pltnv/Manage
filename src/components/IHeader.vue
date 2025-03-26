<template>
  <header class="i-header">
    <div class="i-header__actions">
      <slot />
    </div>
  </header>
</template>

<style lang="scss">
.i-header {
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 0 24px;
  gap: 70px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.4);

  &__actions {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  &__user {
    &__info {
      position: absolute;
      top: 72px;
      right: 10px;
      display: flex;
      flex-direction: column;
      width: 160px;
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
      background-color: white;

      &::before {
        content: "";
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 8px 8px 8px;
        border-color: transparent transparent rgba(195, 189, 189, 0.978) transparent;
      }
    }
  }
}
</style>

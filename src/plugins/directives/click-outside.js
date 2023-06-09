export default {
  install: (app) => {
    app.directive("click-outside", {
      beforeMount: (el, binding) => {
        console.log("hey");
        el.clickOutsideEvent = (e) => {
          if (!(el === e.target || el.contains(e.target))) {
            binding.value(e);
          }
        };
        document.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted: (el) => {
        document.removeEventListener("click", el.clickOutsideEvent);
      }
    });
  }
};

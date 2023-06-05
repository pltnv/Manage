import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Desk from "../views/Desk/Desk.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/desk",
      name: "desk",
      component: Desk
    }
  ]
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import DesksRoutes from "../views/Desk/router/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/AccountLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/HomeView.vue")
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    ...DesksRoutes
  ]
});

export default router;

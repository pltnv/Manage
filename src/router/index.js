import { createRouter, createWebHistory } from "vue-router";
import DesksRoutes from "@/views/Desk/router/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/AccountLayout.vue"),
      children: [
        {
          path: "",
          name: "Main",
          component: () => import("@/views/HomeView.vue")
        }
      ]
    },
    ...DesksRoutes
  ]
});

export default router;

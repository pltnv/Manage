import { createRouter, createWebHistory } from "vue-router";
import DesksRoutes from "@/views/Desk/router/routes";
import LoginRoutes from "@/views/Login/router/routes";
import RegisterRoutes from "@/views/Registration/router/routes";

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
    ...LoginRoutes,
    ...RegisterRoutes,
    ...DesksRoutes
  ]
});

export default router;

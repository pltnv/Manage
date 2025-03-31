import { createRouter, createWebHistory } from "vue-router";
import BoardsRoutes from "@/views/Boards/router/routes";
import BoardRoutes from "@/views/Board/router/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   component: () => import("@/layouts/AccountLayout.vue"),
    //   children: [
    //     {
    //       path: "",
    //       name: "Main",
    //       component: () => import("@/views/HomeView.vue")
    //     }
    //   ]
    // },
    ...BoardsRoutes,
    ...BoardRoutes
  ]
});

export default router;

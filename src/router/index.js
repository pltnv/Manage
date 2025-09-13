import { createRouter, createWebHistory } from "vue-router";
import BoardsRoutes from "@/views/Boards/router/routes";
import BoardRoutes from "@/views/Board/router/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "Boards" }
    },
    ...BoardsRoutes,
    ...BoardRoutes
  ]
});

export default router;

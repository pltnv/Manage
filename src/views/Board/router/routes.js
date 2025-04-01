export default [
  {
    path: "/boards",
    component: () => import("@/layouts/AccountLayout.vue"),
    children: [
      {
        path: "/boards/:id",
        name: "Board",
        component: () => import("../../Board/BoardView.vue")
      }
    ]
  }
];

export default [
  {
    path: "/desks",
    component: () => import("@/layouts/AccountLayout.vue"),
    children: [
      {
        path: "",
        name: "Desks",
        component: () => import("../Desks.vue")
      },
      {
        path: "/desks/:id",
        name: "Desk",
        component: () => import("../DeskView.vue")
      }
    ]
  }
];

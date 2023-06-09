export default [
  {
    path: "/desks",
    component: () => import("../../../layouts/AccountLayout.vue"),
    children: [
      {
        path: "",
        name: "Desks",
        component: () => import("../Desks.vue")
      },
      {
        path: ":id?",
        name: "Desk",
        component: () => import("../Desk.vue")
      }
    ]
  }
];

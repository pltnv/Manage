export default [
  {
    path: "/boards",
    component: () => import("@/layouts/AccountLayout.vue"),
    children: [
      {
        path: "",
        name: "Boards",
        component: () => import("../BoardsView.vue")
      }
    ]
  }
];

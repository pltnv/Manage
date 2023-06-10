export default [
  {
    path: "/login",
    component: () => import("@/layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("../Login.vue")
      }
    ]
  }
];

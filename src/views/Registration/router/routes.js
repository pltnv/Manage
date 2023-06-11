export default [
  {
    path: "/signup",
    component: () => import("@/layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "Register",
        component: () => import("../Registration.vue")
      }
    ]
  }
];

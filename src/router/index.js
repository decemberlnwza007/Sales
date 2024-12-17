import { createRouter, createWebHistory } from "vue-router";

import FirstPage from "@/components/FirstPage.vue";
import SecondPage from "@/components/SecondPage.vue";

const routes = [
  {
    path: "/",
    name: "FirstPage",
    component: FirstPage,
  },
  {
    path: "/Next",
    name: "Next",
    component: SecondPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import Welcome from "@/pages/Welcome.vue";
import Modeler from "@/pages/Modeler.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Welcome,
  },
  {
    path: "/users",
    component: Modeler,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;

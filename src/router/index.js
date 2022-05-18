import { createRouter, createWebHistory } from "vue-router";
import FreeViews from '../views/FreeViews/NavigationFView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: FreeViews,
      redirect: "Home",
      children: [
        {
          path: "/Home",
          name: "Home",
          component: () => import("../views/FreeViews/HomeFView.vue")
        },
        {
          path: "/Sign",
          name: "Sign",
          component: () => import("../views/FreeViews/SignFView.vue")
        },
        {
          path: "/Register",
          name: "Register",
          component: () => import("../views/User/RegisterView.vue")
        }
      ]
    },
    {
      path: "/User",
      component: () => import("../views/User/HomeView.vue"),
      children: [
        {
          path: "/search",
          name: "search",
          component: () => import("../learning/pages/search-list.component.vue")
        }
      ]
    }
  ],
});

export default router;

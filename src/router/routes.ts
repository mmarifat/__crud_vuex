import {RouteConfig} from 'vue-router';
import {Route} from "vue-router/types/router";
import {CRoutes} from "src/interfaces/IEssentials";

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: CRoutes.HOME,
        component: () => import('pages/Index.vue'),
        meta: {
          title: (route: Route) => 'Dashboard',
        }
      },
      {
        path: '/' + CRoutes.POSTS,
        name: CRoutes.POSTS,
        component: () => import('pages/Posts.vue'),
        meta: {
          title: (route: Route) => 'Posts',
        }
      },
      {
        path: '/' + CRoutes.CATEGORIES,
        name: CRoutes.CATEGORIES,
        component: () => import('pages/Categories.vue'),
        meta: {
          title: (route: Route) => 'Categories',
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;

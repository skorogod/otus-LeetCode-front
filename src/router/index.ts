import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import { useUserStore } from '@/shared/store/userStore'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'name',
      component: HomePage,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (Login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/RegisterPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (Login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/LoginPage.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/HomePage.vue')
    },
    {
      path: '/users/:id',
      component: () => import('../pages/users/UserPage.vue'),
      name: 'user',
     
    },
    {
      // See: https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => '404', // import('@/pages/404/Main.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.isAuth) {
    if (true) {
      await router.push({
        name: 'login'
      })
    }
  }
  next()
})

export default router

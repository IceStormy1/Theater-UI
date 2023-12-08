import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/authorization/Login.vue';
import Register from '../views/authorization/Register.vue';
import Profile from '../views/profile/Profile.vue';
import Spectacle from '../views/spectacle/Spectacle.vue';
import Worker from '../views/worker/Worker.vue';
import idsrvAuth from '../idsrvAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        authName: idsrvAuth.authName
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminsPage/Admin.vue')
    },
    {
      path: '/admin/worker-list',
      name: 'admin-workerk-list',
      meta: {
        authName: idsrvAuth.authName
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminsPage/WorkerList.vue')
    },
    {
      path: '/profile/:id',
      component: Profile
    },
    {
      path: '/profile/me',
      component: Profile
    },
    {
      path: '/spectacle/:id',
      component: Spectacle
    },
    {
      path: '/worker/:id',
      component: Worker
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/login',
      component: HomeView,
      meta: {
        authName: idsrvAuth.authName
      },
    },
    {
      path: '/register',
      component: Register
    },
  ]
})

idsrvAuth.useRouter(router)

export default router

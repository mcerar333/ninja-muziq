import { createRouter, createWebHistory } from 'vue-router'

import getUser from '@/composables/getUser'
import Home from '../views/Home.vue'

const user = getUser()

const requiresAuth = (_to, _from, next) => {
  if (!user.value) next({ name: 'Login' })
  else next()
}
const requiresUnauth = (_to, _from, next) => {
  if (user.value) next({ name: 'Home' })
  else next()
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requiresAuth,
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: requiresUnauth,
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/auth/TheLogin'),
  },
  {
    path: '/signup',
    name: 'Signup',
    beforeEnter: requiresUnauth,
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/auth/TheSignup'),
  },

  {
    path: '/playlists/create',
    name: 'CreatePlaylist',
    beforeEnter: requiresAuth,
    component: () =>
      import(
        /* webpackChunkName: "createPlaylist" */ '../views/playlists/CreatePlaylist'
      ),
  },
  {
    path: '/playlists/:id',
    name: 'PlaylistDetails',
    props: true,
    beforeEnter: requiresAuth,
    component: () =>
      import(
        /* webpackChunkName: "playlistDetails" */ '../views/playlists/PlaylistDetails'
      ),
  },
  {
    path: '/playlists/user',
    name: 'UserPlaylists',
    beforeEnter: requiresAuth,
    component: () =>
      import(
        /* webpackChunkName: "userPlaylists" */ '../views/playlists/UserPlaylists'
      ),
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '../views/NotFound'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

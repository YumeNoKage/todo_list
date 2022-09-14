import { createRouter, createWebHistory } from 'vue-router'
import Dashoard from '../views/Dasboard.vue'
import Detail from '../views/Detail.vue'

const routes = [
  {
    path: '/',
    name: 'Dasboard',
    component: Dashoard
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

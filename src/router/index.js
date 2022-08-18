import Vue from 'vue'
import VueRouter from 'vue-router'
import WeatherView from '../views/WeatherView.vue'
import SchoolView from '../views/SchoolView.vue'
import SchoolHome from '../views/School/SchoolHome.vue'
import FavorView from '../views/School/FavorView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/weather',
      name: 'weather',
      component: WeatherView
    },
    {
      path: '/school',
      name: 'school',
      component: SchoolView,
      children: [
        {
          path: 'home',
          name: 'schoolhome',
          component: SchoolHome,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: 'favor',
          name: 'favor',
          component: FavorView
        },
        {
          path: '',
          redirect: '/school/home'
        }
      ]
    },
    {
      path: '*',
      redirect: '/weather'
    }
  ]
})

export default router

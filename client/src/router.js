import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Account from './views/createAccount.vue'
import Flights from './views/flights.vue'
import Login from './components/login.vue'
import EditFlights from './components/EditFlights.vue'
import Review from './components/reviewForm.vue'
import myReviews from './components/my-reviews.vue'
import Delete from './components/deleteAccount.vue'
import ChPass from './components/password.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create-account',
      name: 'createAccount',
      component: Account
    },
    {
      path: '/flights',
      name: 'flights',
      component: Flights
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/edit-flights',
      name: 'edit-flights',
      component: EditFlights
    },
    {
      path: '/write-review',
      name: 'write-review',
      component: Review
    },
    {
      path: '/my-reviews',
      name: 'my-reviews',
      component: myReviews
    },
    {
      path: '/delete',
      name: 'delete',
      component: Delete
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChPass
    }
  ]
})

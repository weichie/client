import Home from './components/Home'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Dashboard from './components/views/Dashboard'
import Clients from './components/views/Clients'
import Income from './components/views/Income'
import Expense from './components/views/Expense'

export const routes = [
   {
      path: '*',
      redirect: '/login'
   },{
      path: '/',
      name: 'Home',
      component: Home
   },{
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
         requiresAuth: true
      }
   },{
      path: '/clients',
      name: 'Clients',
      component: Clients,
      meta: {
         requiresAuth: true
      }
   },{
      path: '/income',
      name: 'Income',
      component: Income,
      meta: {
         requiresAuth: true
      }
   },{
      path: '/expense',
      name: 'Expenses',
      component: Expense,
      meta: {
         requiresAuth: true
      }
   },{
      path: '/login',
      name: 'login',
      component: Login
   },{
      path: '/register',
      name: 'register',
      component: Register
   }
];
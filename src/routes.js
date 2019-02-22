import Home from './components/Home'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Dashboard from './components/views/Dashboard'
import Clients from './components/views/Clients'
import Client from './components/views/Client'
import Income from './components/views/Income'
import Expense from './components/views/Expense'
import AddClient from './components/views/AddClient'

/* Client */
import EditClient from './components/views/client/EditClient'

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
      meta: {requiresAuth: true}
   },{
      path: '/clients',
      name: 'Clients',
      component: Clients,
      meta: {requiresAuth: true}
   },{
      path: '/client/:id',
      name: 'Client',
      component: Client,
      meta: { requiresAuth: true }
   },{
      path: '/client/:id/edit',
      name: 'EditClient',
      component: EditClient,
      meta: { requiresAuth: true }
   },{
      path: '/add-clients',
      name: 'AddClient',
      component: AddClient,
      meta: {requiresAuth: true}
   },{
      path: '/income',
      name: 'Income',
      component: Income,
      meta: {requiresAuth: true}
   },{
      path: '/expense',
      name: 'Expenses',
      component: Expense,
      meta: {requiresAuth: true}
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
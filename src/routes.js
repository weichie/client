import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/Dashboard'

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
      path: '/login',
      name: 'login',
      component: Login
   },{
      path: '/register',
      name: 'register',
      component: Register
   }
];
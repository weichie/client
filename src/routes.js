import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

export const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home
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
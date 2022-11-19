//引入一级路由
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
//路由配置信息
export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showFooter: true,
    },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: {
      showFooter: true,
    },
    name: 'search',
    props: ($route) => {
      return { keyword: $route.params.keyword, k: $route.query.k }
    },
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: {
      showFooter: true,
    },
  },
  {
    path: '/addCartSuccess',
    component: AddCartSuccess,
    name: 'addCartSuccess',
    meta: {
      showFooter: true,
    },
  },
  {
    path: '/shopCart',
    component: ShopCart,
    name: 'ShopCart',
    meta: {
      showFooter: true,
    },
  },
]

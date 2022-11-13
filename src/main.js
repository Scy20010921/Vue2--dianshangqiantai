import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import store from './store/index.js'
//第一个参数:全局组件的名字 第二个参数:哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
//引入mockServer.js---mock数据
import '@/mock/mockServer'
//引入swiper样式
import 'swiper/css/swiper.css'

// import { reqGetSearchInfo } from '@/api'
// console.log(reqGetSearchInfo({}))

Vue.config.productionTip = false

// //测试
// import { reqCategoryList } from '@/api'
// reqCategoryList()
new Vue({
  render: (h) => h(App),
  router,
  //注册仓库:组件实例的身上会多个一个属性$store属性
  store,
}).$mount('#app')

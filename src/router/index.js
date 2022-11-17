import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

// 重写push与replace方法 防止多次点击搜索跳转路由不会报错
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别:相同点,都可以调用函数一次,都可以篡改函数的上下文一次
    //不同点:call与apply传递参数:call传递参数用逗好号隔开,app方法执行,传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别:相同点,都可以调用函数一次,都可以篡改函数的上下文一次
    //不同点:call与apply传递参数:call传递参数用逗好号隔开,app方法执行,传递数组
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

export default new VueRouter({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  },
})

//当前这个模板:API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'
//三级联动接口
// /api/product/getBaseCategoryList get 无参数
//发请求:axios发请求返回结果Promise对象
// export const reqCategoryList = () => {
//   return requests({ url: './product/getBaseCategoryList', method: 'get' })
// }
//三级菜单的请求地址 /api/product/getBaseCategoryList get 没有任何参数
export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`)

// 获取banner(Home首页轮播图接口)
export const reqBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据
// 当前函数需不需要接受外部传递的参数
// 当前这个接口,给服务器传递参数params,至少它是一个空对象,给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取商品详情
export const reqGoodsInfo = (skuid) => requests({ url: `/item/${skuid}`, method: 'get' })

//将产品添加到购物车中(获取更新某一个产品的个数)
// /api/cart/addToCart/{skuId}/{skuNum} POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 获取购物车数据
//URl:/api/cart/cartList method:get
export const reqCartList = () => requests.get('/cart/cartList')

// 删除购物车数据
//DELETE  /api/cart/deleteCart/{skuId} method:DELETE
export const DeleteCartById = (skuId) =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
  })

//修改商品的选中状态
// /api/cart/checkCart/{skuId}/{isChecked} method:get
export const reqUpdateCheckedByid = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码
//URL: /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册
//URL: /api/user/passport/register method:post phone code password
export const reqUserRegister = (data) =>
  requests({ url: '/user/passport/register', data, method: 'post' })

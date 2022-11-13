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

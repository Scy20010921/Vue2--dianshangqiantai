import { reqCartList, DeleteCartById, reqUpdateCheckedByid } from '@/api'
const state = {
  cartList: [],
}

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  },
}
const actions = {
  //获取购物车信息
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  //删除购物车信息
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await DeleteCartById(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //修改购物车某一个产品的选中状态
  async upateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //context:小仓库,commit【提交mutations修改state】 getters【计算属性】 dispatch【派发actions】 state 【当前仓库的数据】
    //获取购物车中全部的产品(是一个数组)
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let result = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      //将每一次返回的Promise添加到数组中
      console.log(result)
      PromiseAll.push(result)
    })
    // 只要全部的p1||p2....都成功,返回结果即为成功
    // 如果有一个失败,返回即为失败结果
    return Promise.all(PromiseAll)
  },
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('upateCheckedById', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    //最终返回的结果
    return Promise.all(promiseAll)
  },
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}

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

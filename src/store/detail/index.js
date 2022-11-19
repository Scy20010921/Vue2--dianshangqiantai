import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
// 封装游客身份模块uuid--->生成一个随机字符串(不能在变了)
import { getUUID } from '@/utils/uuid_token.js'
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID(),
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}

const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    console.log(result.code)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  //将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //加入购物车返回的结果
    // 加入购物车以后(发请求),前台将参数带给了服务器
    // 服务器写入数据库中,并没有返回其他数据,只是返回code=200,代表这次操作成功
    // 因为服务器没有多余的数据,因此咱们不需要三连环存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    //代表服务器成功加入购物车
    if (result.code == 200) {
      return 'ok'
    } else {
      // 加入购物车失败
      return Promise.reject(new Error('faile'))
    }
  },
}
const getters = {
  categoryView(state) {
    //比如:state.goodInfo初始状态空对象,空对象的categoryView属性undefined
    return state.goodInfo.categoryView || {}
  },
  //简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  //产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}

// import { reqGoodsInfo } from '@/api'
// const state = {
//   goodInfo: {},
// }
// const mutations = {
//   GETGOODINFO(state, goodInfo) {
//     state.goodInfo = goodInfo
//   },
// }
// const actions = {
//   async getGoodInfo({ commit }, skuId) {
//     let result = await reqGoodsInfo(skuId)
//     if (result.code == 200) {
//       console.log(result.data)
//       commit('GETGOODINFO', result.data)
//     }
//   },
// }
// const getters = {}

// export default {
//   state,
//   actions,
//   mutations,
//   getters,
// }

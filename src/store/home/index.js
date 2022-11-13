import { reqBannerList, reqCategoryList, reqFloorList } from '@/api'
//home 模块的小仓库
const state = {
  //state中数据默认初始值别瞎写,服务器返回对象,服务器返回数组.[根据接口返回值初始化]
  //home仓库中存储三级菜单的数据
  categoryList: [],
  //轮播图数据
  bannerList: [],
  //floor组件的数据
  floorList: [],
}

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  },
}
const actions = {
  // 通过API里面的接口函数调用,向服务器发请求,获取服务器数据
  async getcategoryList({ commit }) {
    const result = await reqCategoryList()
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    const result = await reqBannerList()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  async getFloorList({ commit }) {
    const result = await reqFloorList()
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  },
}

const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}

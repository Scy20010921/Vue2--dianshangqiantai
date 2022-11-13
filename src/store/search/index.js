import { reqGetSearchInfo } from '@/api'
//search 模块的小仓库
const state = {
  //仓库初始状态
  searchList: {},
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  },
}
const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params = {}) {
    // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候,至少传递一个参数(空对象)
    //params形参:是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
    const result = await reqGetSearchInfo(params)
    console.log(result.data)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  },
}
//计算属性,在项目当中,为了简化数据而生
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}

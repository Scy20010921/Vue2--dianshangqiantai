import { reqGetCode, reqUserRegister } from '@/api'
//登录与注册的模块
const state = {
  code: '',
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
}
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //获取验证码的这个接口:把验证码返回,但是正常情况,后台把验证码发到用户手机上【省钱】
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册
  async userRegister({ commit }, data) {
    let result = await reqUserRegister(data)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
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

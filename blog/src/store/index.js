import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')), //parse()用于将一个字符串解析成一个json对象
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      //存到浏览器本地
      localStorage.setItem('token', token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo)) //(string()是从一个对象中解析出字符串)
    },
    //让所有相关变量变成空
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = ''
      localStorage.setItem('token', '')
      sessionStorage.setItem('userInfo', JSON.stringify(''))
    },
  },
  getters: {
    getUser: (state) => {
      return state.userInfo
    },
  },
  actions: {},
  modules: {},
})

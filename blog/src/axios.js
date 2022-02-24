import axios from 'axios'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://localhost:8083'

//前置拦截
axios.interceptors.request.use((config) => {
  return config
})

//后置拦截
axios.interceptors.response.use(
  (response) => {
    let res = response.data
    //密码错误
    if (res.code === 200) {
      return response
    } else {
      ElementUI.Message.error('账号或密码错误')
      //Uncaught (in promise) 密码错误
      return Promise.reject(response.data.msg)
    }
  },

  (error) => {
    console.log(error)
    console.log(error.response.status)
    //shiro验证不通过，没有权限，跳转登录界面，清空本地缓存
    if (error.response.status === 401) {
      store.commit('REMOVE_INFO')
      router.push('/login')
    }
    ElementUI.Message.error(error.response.data.msg)
    return Promise.reject(error)
  },
)

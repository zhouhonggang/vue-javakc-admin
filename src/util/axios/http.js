import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router/index.js'

let loading
axios.defaults.baseURL = 'http://127.0.0.1:8080'

/**
 * 请求发送前
 */
function beginLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中....',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

/**
 * 请求结束后
 */
function endLoading() {
  loading.close()
}

/**
 * 请求拦截
 */
axios.interceptors.request.use(
  (confing) => {
    beginLoading()
    //设置请求头
    if (localStorage.eToken) {
      confing.headers.Authorization = localStorage.eToken
    }
    return confing
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
axios.interceptors.response.use(
  (response) => {
    endLoading()
    return response
  },
  (error) => {
    Message.error(error.response.data)
    endLoading()
    // 获取状态码
    const { status } = error.response
    if (status === 401) {
      Message.error('请重新登录')
      //清楚token
      localStorage.removeItem('eToken')
      //跳转到登录页面
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default axios

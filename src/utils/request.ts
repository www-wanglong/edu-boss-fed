import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({

})

function refreshToken () {
  return axios.create()(
    {
      method: 'POST',
      url: '/front/user/refresh_token',
      data: qs.stringify({
        refreshtoken: store.state.user.refresh_token
      })
    }
  )
}

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.access_token) {
    Object.assign(config.headers, {
      Authorization: user.access_token
    })
  }
  return config
})

// 控制刷新的次数 只能一次
let isRefreshing = false
let requests: any = [] // 存储失败的接口

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response) { // 请求收到
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user) { // 跳转登录页面
        redirectLogin()
        return Promise.reject(error)
      }

      // 刷新token
      if (!isRefreshing) {
        isRefreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新失败')
          }
          store.commit('setUser', res.data.content)
          // 把失败请求重新发出
          // 执行挂起的请求
          requests.forEach(cb => cb())
          requests = []
          return request(error.config)
        }).catch(err => {
          console.log('error', err)
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          isRefreshing = false
        })
      }
      // 刷新状态下 把请求挂起 放到requests 中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端异常')
    }
  } else if (error.request) { // 没有响应
    Message.error('请求超时，请刷新重试')
  } else {
    Message.error(`请求失败：${error.message}`)
  }
  return Promise.reject(error)
})
export default request

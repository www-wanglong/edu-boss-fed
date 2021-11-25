/**
 * 用户相关请求
 */
import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import qs from 'qs'

interface User {
  phone: string
  password: string
}

/**
 * 登录接口
 * @param data
 * @returns
 */
export const login = (data: User): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

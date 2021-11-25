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

export const login = (data: User): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

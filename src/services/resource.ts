/**
 * 资源
 */
import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export const getResourcePages = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

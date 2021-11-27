/**
 * 资源分类
 */
import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export const getResourceCategories = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

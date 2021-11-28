/**
 * 用户相关请求
 */
import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export const createOrUpdateMenu = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenus = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

/**
 * 获得菜单树
 * @returns
 */
export const getMenuNodeList = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

/**
 * 分配菜单
 * @param data
 * @returns
 */
export const allocateRoleMenus = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

/**
 * 获取角色的菜单
 * @returns
 */
export const getRoleMenus = (roleId: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}

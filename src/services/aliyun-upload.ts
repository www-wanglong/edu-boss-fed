/**
 * 阿里云上传
 */

import request from '@/utils/request'

/**
 * 获取上传凭证
 * @returns
 */
export const aliyunImagUploadAddressAdnAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

export const aliyunVideoUploadAddressAdnAuth = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}

export const transCodeVideo = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

/**
 * 获取转码进度
 * @param lessonId
 * @returns
 */
export const getAliyunTransCodePercent = (lessonId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}

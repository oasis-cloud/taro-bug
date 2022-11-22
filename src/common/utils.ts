import Taro from '@tarojs/taro'
import { ATT_UPLOAD } from './constants'
import { ATT_SERVER } from './env'
import globalData from './globalData'

export const showToast = (title: string) => {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 2000,
  })
}
export const getImgUrl = (id) => {
  if (id) {
    return `${ATT_SERVER}/rest/fileservice/download/${id}?photoType=1`
  }
  return ''
}
export const getFormData = (obj: any) => {
  const formData = new FormData()
  Object.entries(obj).forEach(([key, value]: any[]) => {
    formData.append(key, value)
  })
  return formData
}
export const uploadImage = () => {
  return new Promise((resolve) => {
    Taro.chooseImage({
      count: 1,
      success(res) {
        Taro.uploadFile({
          url: ATT_UPLOAD,
          filePath: '',
          name: '',
          formData: {
            token: 666,
            files: res.tempFiles[0].originalFileObj,
          },
          success({ data }) {
            const formatData = JSON.parse(data)
            resolve(formatData.data.fileIds)
          },
        })
      },
    })
  })
}
export const renderDic = (dictionary) => (value) => {
  if (!Array.isArray(dictionary)) return ''
  const result = dictionary.filter((e) => e.value == value)
  return result.length ? (result[0].label || result[0].text) : ''
}

export const dealDistance = (distance) => {
  if (distance < 1000) {
    return `${distance}米`
  }
  const dis = (distance / 1000).toFixed(1)
  return `${dis}公里`
}
export const getDicList = (name) => {
  return globalData.dic[name] || []
}
// 将js对象转换为url参数形式
export const urlEncode = (params = {}) => {
  return Object.entries(params)
    .reduce(
      (acc, curr: any) => `${acc}${curr[0]}=${encodeURIComponent(curr[1] ?? '')}&`,
      '?',
    )
    .slice(0, -1)
}
// 获取浙里办环境
export const getContext = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  if (userAgent.includes('miniprogram')) {
    if (userAgent.includes('alipay')) {
      return 'alipay'
    }
    return 'wechat'
  }
  return 'app'
}

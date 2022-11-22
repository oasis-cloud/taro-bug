import Taro from '@tarojs/taro'
import { baseURL } from './env'
import { showToast } from './utils'

export const post = (url: string, params?: Object) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${baseURL}${url}`,
      data: params,
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        token: 'linkcld',
      },
      success(res) {
        const { data } = res
        if (data.returnFlag == 200) {
          resolve(data.data)
        } else {
          showToast(data.returnInfo)
          reject(data)
        }
      },
    })
  })
}

export const get = (url: string, params?: Object) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${baseURL}${url}`,
      data: params,
      header: {
        'content-type': 'application/json',
        token: 'linkcld',
      },
      success(res) {
        const { data } = res
        if (data.returnFlag == 200) {
          resolve(data.data)
        } else {
          showToast(data.returnInfo)
          reject(data)
        }
      },
    })
  })
}

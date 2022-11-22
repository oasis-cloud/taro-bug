import { DEFAULT_LOCATION } from './constants'
import { getContext, urlEncode } from './utils'

declare const AMap
declare const my
declare const wx
export const getLocation = () => {
  return new Promise((resolve) => {
    AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        showButton: false,
      })
      geolocation.getCurrentPosition((status, result) => {
        if (status == 'complete') {
          resolve({
            lng: result.position.lng,
            lat: result.position.lat,
          })
        } else {
          resolve({
            lng: DEFAULT_LOCATION.lng,
            lat: DEFAULT_LOCATION.lat,
          })
        }
      })
    })
  })
}
interface ILocation {
  lng: number;
  lat: number;
  name: string;
  address?: string;
}
export const openLocation = ({ lng, lat, name, address }: ILocation) => {
  const handles = {
    alipay: () => {
      my.openLocation({
        longitude: lng,
        latitude: lat,
        name,
        address,
      })
    },
    wechat: () => {
      wx.openLocation({
        longitude: lng,
        latitude: lat,
        name,
        address,
      })
    },
    app: () => {
      const params = {
        longitude: lng,
        latitude: lat,
        locationName: name,
      }
      window.location.replace(`zwfw://openThirdMap${urlEncode(params)}`)
    },
  }
  handles[getContext()]()
}

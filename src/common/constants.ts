import { ATT_SERVER } from './env'

export const ATT_UPLOAD = `${ATT_SERVER}/rest/fileservice/upload`
interface ILocation {
  lng: number;
  lat: number;
}
export const DEFAULT_LOCATION: ILocation = {
  lng: 122.21,
  lat: 29.99,
}

import axios from 'axios'
import 'reflect-metadata'

interface HttpBase {
  http: any,
  get (str: string, data: object, resolve: any): void,
  delete (str: string, data: object, resolve: any): void,
  put (str: string, data: object, resolve: any): void,
  post (str: string, data: object, resolve: any): void
}

class AxiosUtil {

  public static http: any

  public static getAxios (): any {
    if (!this.http) {
      this.http = axios
      this.http.timeout = 45000

      this.http.interceptors.request.use((config: any) => {
        return config
      }, (error: any) => {
        return Promise.reject(error)
      })

      this.http.interceptors.response.use((response: any) => {
        return response
      }, (error: any) => {
        return Promise.reject(error)
      })
    }
    return this.http
  }
}

export class Service implements HttpBase {

  public http: any
  public ROOT_URL: string

  constructor (path: string) {
    this.http = AxiosUtil.getAxios()
    this.ROOT_URL = path
  }

  public async get (str: string, data: Map<string, any>): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(`${this.ROOT_URL}${str}`, {
        params: data || {}
      }).then((res: any): any => {
        if (res.status === 200 && res.data.status === 0) {
          resolve(res.data)
        } else {
          resolve(res.data || {
            msg: '请求失败',
            status: 1
          })
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  public async delete (str: string, data: Map<string, any>): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(`${this.ROOT_URL}${str}`, {
        params: data || {}
      }).then((res: any): any => {
        if (res.status === 200 && res.data.status === 0) {
          resolve(res.data)
        } else {
          resolve(res.data || {
            msg: '请求失败',
            status: 1
          })
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  public async put (str: string, data: Map<string, any>): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.http.put(`${this.ROOT_URL}${str}`, data).then((res: any): any => {
        if (res.status === 200 && res.data.status === 0) {
          resolve(res.data)
        } else {
          resolve(res.data || {
            msg: '请求失败',
            status: 1
          })
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  public async post (str: string, data: Map<string, any>): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.http.post(`${this.ROOT_URL}${str}`, data).then((res: any): any => {
        if (res.status === 200 && res.data.status === 0) {
          resolve(res.data)
        } else {
          resolve(res.data || {
            msg: '请求失败',
            status: 1
          })
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

}

const servicesMap: any = require.context('./', true, /\.ts$/)
const services = {}

servicesMap.keys().forEach((key: string) => {
  if (key.indexOf('index.ts') > -1) {
    if (key.indexOf('./index.ts') === -1) {
      const tmpKey: string = key.replace('./', '').replace('/index.ts', 'Service')
      services[tmpKey] = servicesMap(key).default
    }
  }
})

export default services
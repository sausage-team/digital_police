import { Service } from '..'
import { action } from 'mobx'

export class MenuService extends Service {

  constructor (path: string = '/api/menu') {
    super(path)
  }

  @action public async getMenuList (data: any = {}): Promise<any> {
    return this.get('/user_menu', data)
  }

  @action public async getHref (data: any = {}): Promise<any> {
    return this.get('/show_href', data)
  } 
}

export default new MenuService()

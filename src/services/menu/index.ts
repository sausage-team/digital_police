import { Service } from '..'
import { action } from 'mobx'

export class MenuService extends Service {

  constructor (path: string = '/api/menu') {
    super(path)
  }

  @action public async sign (data: any = {}): Promise<any> {
    return this.get('/user_menu', data)
  }

}
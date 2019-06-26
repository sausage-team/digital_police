import { Service } from '..'
import { action } from 'mobx'

export class UserService extends Service {

  constructor (path: string = '/api/user') {
    super(path)
  }

  @action public async testUser (data: any = {}): Promise<any> {
    return this.get('/', data)
  }
}

export default new UserService()
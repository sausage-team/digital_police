import { Service } from '..'
import { action } from 'mobx'

export class CoopService extends Service {

  constructor (path: string = '/api/coop') {
    super(path)
  }

  @action public async getCoopList (data: any = {}) {
    return this.get('/list', data)
  }

}

export default new CoopService()
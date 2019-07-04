import { Service } from '..'
import { action } from 'mobx'

export class CoopService extends Service {

  constructor (path: string = '/api/coop') {
    super(path)
  }

  @action public async getCoopList (data: any = {}) {
    return this.get('/list', data)
  }
  
  @action public async addCoop (data: any = {}) {
    return this.post('/add', data)
  }

  @action public async receive (data: any = {}) {
    return this.get('/receive', data)
  }

  @action public async finish (data: any = {}) {
    return this.get('/finish', data)
  }

  @action public async detail (data: any = {}) {
    return this.get('', data)
  }

  @action public async feedback (data: any = {}) {
    return this.post('/feedback', data)
  }
}

export default new CoopService()
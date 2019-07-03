import { Service } from '..'
import { action } from 'mobx'

export class MsgService extends Service {

  constructor (path: string = '/api/msg') {
    super(path)
  }

  @action public async getTaskTree (data: any = {}): Promise<any> {
    return this.get('/task/tree', data)
  }

  @action public async getMsgList (data: any = {}): Promise<any> {
    return this.get('/list', data)
  }

}

export default new MsgService()
import { Service } from '..'
import { action } from 'mobx'

export class GroupService extends Service {

  constructor (path: string = '/api/group') {
    super(path)
  }

  @action public async getGroup (data: any = {}): Promise<any> {
    return this.get('/show_group', data)
  }

}

export default new GroupService()
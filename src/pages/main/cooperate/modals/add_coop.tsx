import * as React from 'react'
import { Modal, Input } from 'antd'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { UserService } from 'src/services/user'
import { GroupService } from 'src/services/group'

interface AddCoopProps {
  visible: boolean
  close: () => void
  onRef: (ref: any) => void
}

interface CoopDataProp {
  name: string,
  sponsor_name: string,
  sponsor_police_id: string,
  sponsor_dep: string,
  sponsor_dep_code: string,
  remarks: string
}

@inject('userService', 'groupService')
@observer
class AddCoop extends React.Component<AddCoopProps, {}> {

  @observable public coopData: CoopDataProp

  public userService: UserService
  public groupService: GroupService

  constructor (props: any) {
    super(props)
    this.userService = props.userService
    this.groupService = props.groupService
    this.refresh()
  }

  public init = () => {
    this.refresh()
    this.initUserProfile()
  }

  public refresh = () => {
    this.coopData = {
      name: '',
      sponsor_name: '',
      sponsor_police_id: '',
      sponsor_dep: '',
      sponsor_dep_code: '',
      remarks: ''
    }
  }

  public async initUserProfile () {
    const res: any = await this.userService.getProfile()
    if (res.status === 0) {
      this.coopData = {
        ...this.coopData,
        sponsor_name: res.data.name,
        sponsor_police_id: res.data.police_id
      }
    }
    const resp: any = await this.groupService.getGroup()
    if (resp.status === 0) {
      this.coopData = {
        ...this.coopData,
        sponsor_dep: resp.data.name,
        sponsor_dep_code: resp.data.id
      }
    }
  }

  public componentDidMount () {
    this.props.onRef(this)
  }

  public ok = () => {
    console.log(this.coopData)
  }

  public cancel = () => {
    this.props.close()
  }

  public render () {
    const { visible } = this.props

    return (
      <Modal
        className="add-coop-modal"
        title="情报协作表单"
        centered
        cancelText={'取消'}
        okText={'确定'}
        visible={visible}
        onOk={this.ok}
        onCancel={this.cancel}
      >
        <div className="form-input">
          <label>事项名称</label>
          <Input
            placeholder="请填写名称（必填）"
            value={this.coopData.name}
            onChange={e => { this.coopData.name = e.target.value }} />
        </div>
        <div className="form-input">
          <label>协作部门</label>
          <Input />
        </div>
        <div className="form-input area">
          <label>协作请求描述</label>
          <Input.TextArea
            placeholder="请填写协作请求描述…"
            value={this.coopData.remarks}
            onChange={e => { this.coopData.remarks = e.target.value }} />
        </div>
        <div className="form-input">
          <div className="item">
            <label>发起人姓名</label>
            <Input disabled value={this.coopData.sponsor_name} onChange={e => { this.coopData.sponsor_name = e.target.value }} />
          </div>
          <div className="item">
            <label>发起人警号</label>
            <Input disabled value={this.coopData.sponsor_police_id} onChange={e => { this.coopData.sponsor_police_id = e.target.value }}/>
          </div>
        </div>
        <div className="form-input">
          <div className="item">
            <label>发起人单位</label>
            <Input disabled value={this.coopData.sponsor_dep} onChange={e => { this.coopData.sponsor_dep = e.target.value }} />
          </div>
          <div className="item">
            <label>单位编码</label>
            <Input disabled value={this.coopData.sponsor_dep_code} onChange={e => { this.coopData.sponsor_dep_code = e.target.value }} />
          </div>
        </div>
      </Modal>
    )
  }
}

export default AddCoop
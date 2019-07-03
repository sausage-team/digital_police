import * as React from 'react'
import {
  Button,
  Table
} from 'antd'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import { CoopService } from 'src/services/coop'
import Util from 'src/utils'
import Bean from 'src/beans'
import AddCoop from './modals/add_coop';

@inject('coopService')
@observer
class Cooperate extends React.Component<{}, {}> {

  public coopService: CoopService
  public tableConfig: any[]
  public tableBox: React.RefObject<any>
  public addCoopRef: any
  public count: number

  @observable public page: number
  @observable public total: number
  @observable public tableData: any[]
  @observable public scrollHeight: number
  @observable public pagination: any
  @observable public addCoopModal: boolean

  constructor (props: any) {
    super(props)
    this.tableBox = React.createRef()
    this.coopService = props.coopService
    this.addCoopModal = false
    this.pagination = {
      current: 1,
      pageSize: 10,
      total: 10,
      size: 'middle',
      hideOnSinglePage: true,
      onChange: this.changePage
    }
    this.initTable()
  }

  public componentDidMount () {
    this.scrollHeight = this.tableBox.current.offsetHeight
  }

  public changePage = (page: number) => {
    console.log(page)
  }

  public openAddCoop = () => {
    this.addCoopRef.init()
    this.addCoopModal = true
  }

  public closeAddCoop = () => {
    this.addCoopModal = false
  }

  public initTable = async () => {
    this.tableConfig = [
      {
        width: 200,
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        width: 180,
        title: '发起时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: (data: any) => (
          <div>
            {Util.momentDate(data)}
          </div>
        )
      },
      {
        title: '协作内容',
        dataIndex: 'remarks',
        key: 'remarks'
      },
      {
        width: 80,
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (data: any) => (
          <div>
            {Bean.COOP_STATUS_MAP[data]}
          </div>
        )
      },
      {
        width: 80,
        title: '操作',
        key: 'op',
        render: () => (
          <div className="op-box">
            <Button size="small">接受</Button>
          </div>
        )
      }
    ]
    this.tableData = []
    const res: any = await this.coopService.getCoopList()
    if (res.status === 0) {
      this.tableData = [] = res.data.data
      this.pagination.total = res.data.total_count
    }
  }

  public onRef = (ref: any) => {
    this.addCoopRef = ref
  }

  public render () {
    return (
      <div className="cooperate-main">
        <AddCoop onRef={this.onRef} visible={this.addCoopModal} close={this.closeAddCoop} />
        <div className="cooperate-con">
          <div className="coo-header">
            <i></i>
            <span>派出所民警</span>
          </div>
          <div className="coo-body">
            <Button icon="plus" onClick={this.openAddCoop} type="primary">
              发起协作
            </Button>
            <div ref={this.tableBox} className="table-con">
              <Table
                rowKey="id"
                bordered
                size="small"
                scroll={{
                  x: false,
                  y: this.scrollHeight
                }}
                pagination={this.pagination}
                columns={this.tableConfig}
                dataSource={this.tableData} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cooperate
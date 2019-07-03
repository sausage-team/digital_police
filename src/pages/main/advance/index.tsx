import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { MsgService } from 'src/services/msg'
import { Collapse, Button, Table } from 'antd'
import { observable } from 'mobx'
import Bean from 'src/beans'

@inject('msgService')
@observer
class Advance extends React.Component<{}, {}> {

  public msgService: MsgService
  public tableConfig: any[]
  public tableBox: React.RefObject<any>

  @observable public taskList: any[] = []
  @observable public msgList: any[] = []
  @observable public pagination: any
  @observable public chooseTask: string
  @observable public scrollHeight: number

  constructor (props: any) {
    super(props)
    this.msgService = props.msgService
    this.init()
    this.pagination = {
      current: 1,
      pageSize: 10,
      total: 10,
      size: 'middle',
      hideOnSinglePage: true,
      onChange: this.changePage
    }
  }

  public componentDidMount () {
    this.scrollHeight = this.tableBox.current.offsetHeight
  }

  public changePage = (page: number) => {
    console.log(page)
  }

  public init = async () => {
    this.tableBox = React.createRef()
    this.tableConfig = [
      {
        title: '任务',
        dataIndex: 'title',
        key: 'title'
      },
      {
        width: 100,
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (data: any) => (
          <div>{Bean.MSG_STATUS[data]}</div>
        )
      },
      {
        width: 200,
        title: '操作',
        key: 'op',
        render: () => (
          <div className="op-box">
            <Button size="small">接受</Button>
          </div>
        )
      }
    ]
    const res: any = await this.msgService.getTaskTree()
    if (res.status === 0) {
      this.taskList = res.data
      const task: any = await new Promise((resolve: any) => {
        this.taskList.filter((item: any): boolean | void => {
          if (item.children && item.children.length > 0) {
            if (item.children[0]) {
              resolve(item.children[0])
              return true
            }
          }
        })
      })
      this.chooseTask = task.id
      const resp: any = await this.msgService.getMsgList({id: this.chooseTask})
      if (resp.status === 0) {
        this.msgList = resp.data.list
      }
    }
  }

  public chooseMsg = async (item: any) => {
    console.log(item)
  }

  public render () {
    return (
      <div className="advance-main">
        <div className="advance-con">
          <div className="con-left">
            <Collapse>
              {
                this.taskList.map((item: any) => {
                  return (
                    <Collapse.Panel header={`${item.name}(${item.count})`}  key={item.id}>
                      <ul>
                        {
                          (item.children && item.children.length > 0) ? (
                            item.children.map((n: any) => {
                              return (
                                <li onClick={this.chooseMsg.bind(this, n)} key={n.id}>{`${n.name}(${n.count})`}</li>
                              )
                            })
                          ) : ('')
                        }
                      </ul>
                    </Collapse.Panel>
                  )
                })
              }
            </Collapse>
          </div>
          <div ref={this.tableBox} className="con-right">
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
              dataSource={this.msgList} />
          </div>
        </div>
      </div>
    )
  }
  
}

export default Advance
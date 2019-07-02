import { observer, inject } from 'mobx-react'
import * as React from 'react'
import { Menu, Icon } from 'antd'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Home from './home'
import HeaderNav from 'src/components/header'

import { UserService } from 'src/services/user'
import { observable } from 'mobx';
import { HomeStore } from 'src/stores/modules/home'

interface MainProps {
  name?: string
}

@inject('userService', 'homeStore')
@observer
export default class Main extends React.Component<MainProps & RouteComponentProps<{}>, {}> {

  public userService: UserService
  public homeStore: HomeStore

  @observable public collapsed: boolean = false
  @observable public menuList: any[]
  @observable public selectItem: string
  @observable public expandItem: string[]

  constructor (props: any) {
    super(props)
    this.userService = props.userService
    this.homeStore = props.homeStore
    this.selectItem = 'home'
    this.expandItem = []
  }

  public componentDidMount () {
    console.log(1)
  }

  public toggleMenu = () => {
    this.collapsed = !this.collapsed
  }

  public toggleExpand = (sub: string[]) => {
    this.expandItem = [...sub]
  }

  public expandTitle = (e: any) => {
    console.log(e, this.expandItem)
  }

  public render () {
    const location = this.props.location
    const { pathname } = location
    return (
      <div className="main">
        <HeaderNav toggle={this.toggleMenu} />
        <div className="main-body">
          <div className={`left-menu ${this.collapsed ? '' : 'unexpand' }`}>
            <Menu
              defaultSelectedKeys={[this.selectItem]}
              defaultOpenKeys={this.expandItem}
              mode="inline"
              onOpenChange={this.toggleExpand}
              theme="dark">
                <Menu.Item key="home">
                  <Icon type="pie-chart" />
                  <span>工作台</span>
                </Menu.Item>
                <Menu.SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="pie-chart" />
                      <span>基础所情展示</span>
                    </span>
                  }>
                  <Menu.Item key="sub2_1">所情</Menu.Item>
                  <Menu.Item key="sub2_2">人口</Menu.Item>
                  <Menu.Item key="sub2_3">房屋</Menu.Item>
                  <Menu.Item key="sub2_4">警情</Menu.Item>
                  <Menu.Item key="sub2_5">案件</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>专项分析研判</span>
                    </span>
                  }>
                  <Menu.SubMenu
                    key="sub3_1"
                    onTitleClick={this.expandTitle}
                    title={
                      <span>
                        <Icon type="mail" />
                        <span>社区管理</span>
                      </span>
                    }
                  >
                  </Menu.SubMenu>
                </Menu.SubMenu>
                <Menu.Item key="3">
                  <Icon type="inbox" />
                  <span>任务预警中心</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="inbox" />
                  <span>情报协作</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="inbox" />
                  <span>打击破案</span>
                </Menu.Item>
            </Menu>
          </div>
          <div className="right-body">
            <TransitionGroup className="main-route">
              <CSSTransition
                key={pathname.split('/')[2]}
                timeout={{ enter: 1000, exit: 0 }}
                classNames={'fade'}>
                  <Switch location={location}>
                    <Route
                      path="/main/home"
                      component={Home}
                    />
                    <Redirect to="/main/home" />
                  </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}
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

@inject('userService', 'home')
@observer
export default class Main extends React.Component<MainProps & RouteComponentProps<{}>, {}> {

  public userService: UserService
  public homeStore: HomeStore

  @observable public collapsed: boolean = false

  constructor (props: any) {
    super(props)
    this.userService = props.userService
    this.homeStore = props.home
  }

  public componentDidMount () {
    console.log(2)
  }

  public toggleMenu = () => {
    this.collapsed = !this.collapsed
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark">
                <Menu.Item key="1">
                  <Icon type="pie-chart" />
                  <span>工作台</span>
                </Menu.Item>
                <Menu.SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>指挥研判</span>
                    </span>
                  }
                >
                  <Menu.SubMenu
                    key="sub1_1"
                    title={
                      <span>
                        <Icon type="mail" />
                        <span>二级标题</span>
                      </span>
                    }
                  >
                    <Menu.Item key="sub1_1_1">三级标题</Menu.Item>
                  </Menu.SubMenu>
                  <Menu.Item key="sub1_2">二级级标题</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="3">
                  <Icon type="inbox" />
                  <span>社区管理</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="inbox" />
                  <span>街面巡控</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="inbox" />
                  <span>打击破案</span>
                </Menu.Item>
                <Menu.Item key="6">
                  <Icon type="inbox" />
                  <span>情报协作</span>
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
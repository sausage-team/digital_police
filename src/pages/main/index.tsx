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
                  <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="desktop" />
                  <span>Option 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="inbox" />
                  <span>Option 3</span>
                </Menu.Item>
                <Menu.SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>Navigation One</span>
                    </span>
                  }
                >
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="appstore" />
                      <span>Navigation Two</span>
                    </span>
                  }
                >
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                  </Menu.SubMenu>
                </Menu.SubMenu>
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
import { observer, inject } from 'mobx-react'
import * as React from 'react'
import { Menu, message } from 'antd'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { observable } from 'mobx'
import Util from 'src/utils'

import Home from './home'
import Cooperate from './cooperate'
import Advance from './advance'
import HeaderNav from 'src/components/header'

import { UserService } from 'src/services/user'
import { HomeStore } from 'src/stores/modules/home'
import { MenuService } from 'src/services/menu'
import { MenuStore } from 'src/stores/modules/menu'

@inject('userService', 'menuService', 'homeStore', 'menuStore')
@observer
class Main extends React.Component<RouteComponentProps<{}>, {}> {

  public userService: UserService
  public homeStore: HomeStore
  public menuService: MenuService
  public menuStore: MenuStore

  @observable public collapsed: boolean = false
  @observable public menuList: any[]
  @observable public selectItem: string
  @observable public selectExpand: string[] = []

  constructor (props: any) {
    super(props)
    this.initConfig(props)
    this.getMenuList()
  }

  public initConfig (props: any): void {
    this.userService = props.userService
    this.homeStore = props.homeStore
    this.menuService = props.menuService
    this.menuStore = props.menuStore
  }

  public getMenuList = async () => {
    const item: any = this.menuStore.getMenu()
    if (item) {
      this.selectItem = item.id
      this.selectExpand = item.parent_id
    }
    const list: any = await this.menuStore.getMenuList()
    if (list && list.length > 0) {
      this.menuList = list
      return
    }
    const res = await this.menuService.getMenuList()
    if (res.status === 0) {
      Util.setMenu(res.data)
      this.menuList = res.data
      this.menuStore.setMenuList(this.menuList)
    } else {
      message.error(res.msg || '获取菜单失败')
    }
  }

  public chooseMenu = async (item: any) => {
    const res: any = await this.menuService.getHref({menu_name: item.name})
    let href: string = ''
    if (res.status === 0) {
      href = res.data
    } else {
      message.error(res.msg || '获取链接失败')
      return
    }
    this.menuStore.setMenu({
      ...item,
      href
    })
    switch (item.type) {
      case 'dynamic':
        this.props.history.push(`/main/home?id=${item.id}&&href=${encodeURIComponent(item.href)}`)
        break
      case 'static':
      default:
        this.props.history.push(`${href}?id=${item.id}`)
        break
    }
  }

  public toggleMenu = () => {
    this.collapsed = !this.collapsed
  }

  public MenuItem = (list: any[]): React.ReactNode => {
    if (list && list.length > 0) {
      return list.map((item) => {
        if (item.children && item.children.length > 0) {
          return (
            <Menu.SubMenu
              key={item.id}
              title={
                <span>{item.name}</span>
              }>
                {this.MenuItem(item.children)}
                
            </Menu.SubMenu>
          )
        } else {
          return (
            <Menu.Item
              onClick={this.chooseMenu.bind(this, item)}
              key={item.id}>
              <span>{item.name}</span>
            </Menu.Item>
          )
        }
      })
    }
    return
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
              defaultOpenKeys={this.selectExpand}
              mode="inline"
              theme="dark">
                {
                  this.MenuItem(this.menuList)
                }
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
                    <Route
                      path="/main/cooperate"
                      component={Cooperate}
                    />
                    <Route
                      path="/main/advance"
                      component={Advance}
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

export default Main
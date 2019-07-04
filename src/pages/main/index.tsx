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
import { UserStore } from 'src/stores/modules/user'

@inject('userService', 'menuService', 'homeStore', 'menuStore', 'userStore')
@observer
class Main extends React.Component<RouteComponentProps<{}>, {}> {

  public userService: UserService
  public homeStore: HomeStore
  public menuService: MenuService
  public menuStore: MenuStore
  public userStore: UserStore

  @observable public collapsed: boolean = false
  @observable public menuList: any[]
  @observable public selectItem: string[]
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
    this.userStore = props.userStore
  }

  public getMenuList = async () => {
    const item: any = this.menuStore.getMenu()
    if (item) {
      this.selectItem = [item.id]
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
      if (!item) {
        const select: any = this.menuList.slice()[0]
        this.selectItem = [select.id]
        this.selectExpand = select.parent_id
        const href: string = await this.menuCache(select)

        if (!location.search && href) {
          this.props.history.push(href)
        }
      }
      console.log(this.selectItem)
    } else {
      message.error(res.msg || '获取菜单失败')
    }
    
  }

  public menuCache = async (item: any): Promise<string> => {
    const res: any = await this.menuService.getHref({menu_name: item.name})
    let href: string = ''
    if (res.status === 0) {
      href = res.data
    } else {
      message.error(res.msg || '获取链接失败')
      return ''
    }
    this.menuStore.setMenu({
      ...item,
      href
    })
    switch (item.type) {
      case 'dynamic':
        return `/main/home?id=${item.id}&&href=${encodeURIComponent(item.href)}`
        break
      case 'static':
      default:
        return `${href}?id=${item.id}`
        break
    }
  }

  public chooseMenu = async (item: any) => {
    const href: string = await this.menuCache(item)
    if (href) {
      this.props.history.push(href)
    }
    this.selectItem = [item.id]
    this.collapsed = false
  }

  public expandItem = async (data: any) => {
    const index = this.selectExpand.indexOf(data.id)
    if (index > -1) {
      this.selectExpand.splice(index, 1)
    } else {
      this.selectExpand.push(data.id)
    }
  }

  public toggleMenu = () => {
    this.collapsed = !this.collapsed
  }
  
  public hideMenu = () => {
    this.collapsed = false
  }

  public showMenu = () => {
    this.collapsed = true
  }

  public sigout = async (): Promise<any> => {
    const res = await this.userService.sigout()
    if (res.status === 0) {
      this.userStore.sigout()
    } else {
      message.error(res.msg || '操作失败')
    }
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
              }
              onTitleClick={this.expandItem.bind(this, item)}>
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

  public componentWillReceiveProps (nextPrpos: any) {
    if (nextPrpos.location.pathname !== this.props.location.pathname) {
      const search = nextPrpos.location.search
      const map: any = Util.getHrefMap(search)
      this.selectItem = [map.id]
    }
   
  }

  public render () {
    const location = this.props.location
    const { pathname } = location

    return (
      <div className="main">
        <HeaderNav toggle={this.toggleMenu} sigout={this.sigout}/>
        <div className="main-body">
          <div className="menu-slide" onMouseEnter={this.showMenu}></div>
          <div onMouseLeave={this.hideMenu} className={`left-menu ${this.collapsed ? '' : 'unexpand' }`}>
            <Menu
              selectedKeys={this.selectItem}
              openKeys={this.selectExpand}
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
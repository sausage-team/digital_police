import * as React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react';
import { MenuStore } from 'src/stores/modules/menu'
import { UserStore } from 'src/stores/modules/user'
import Util from 'src/utils'
import { RouteComponentProps } from 'react-router';

interface HomePorps extends RouteComponentProps {
  userStore: UserStore
  menuStore: MenuStore
  menu: any
}

@inject('menuStore', 'userStore')
@observer
export default class Home extends React.Component<HomePorps, {}> {  

  public menuStore: MenuStore
  public userStore: UserStore

  @observable public url: string

  constructor (props: any) {
    super(props)
    this.menuStore = props.menuStore
    this.userStore = props.userStore
  }

  public componentWillReceiveProps () {
    const map: any = Util.getHrefMap(location.search)
    if (map && map.href) {
      this.url = decodeURIComponent(map.href)
    }
       
  }
  public componentDidMount () {
    window.addEventListener('message', async (event: any) => {
      let BDPOrigin = 'http://10.73.92.144'
      if (this.url) {
        const originArray = this.url.split(':')
        BDPOrigin = originArray[0] + ':' + originArray[1]
      }

      if (event.origin !== BDPOrigin) {
        return
      }
      if (event.data.type === 'getToken') {
        const account: any = this.userStore.getAccount()
        event.source.postMessage({'access_token': account.access_token}, event.origin)
        return
      }
      const menuList: any = await this.menuStore.getMenuList()
      const menuListArray: [] = menuList.slice()
      if (event.data.type === 'toDigitalInfoCoop') {
        const targetMenu: any = menuListArray.find((item: any) => {
          return item.id === '15'
        })
        const targetMenuObj = {...targetMenu}
        this.menuStore.setMenu(targetMenuObj)
        this.props.history.push('/main/cooperate?id=15')
      }

      if (event.data.type === 'toDigitalTask') {
        const targetMenu: any = menuListArray.find((item: any) => {
          return item.id === '14'
        })
        const targetMenuObj = {...targetMenu}
        this.menuStore.setMenu(targetMenuObj)
        this.props.history.push('/main/advance?id=14')
      }

    }, false);
  }

  public render () {
    return (
      <div className="home-main">
        {
          (this.url) ? (
            <iframe
              className="home-frame"
              src={(this.url.indexOf('http://') > -1) ? (this.url) : (`http://localhost:9300`)} >
            </iframe>
          ) : ('')
        }
      </div>
    )
  }
}
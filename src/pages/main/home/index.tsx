import * as React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react';
import { MenuStore } from 'src/stores/modules/menu'
import Util from 'src/utils'

interface HomePorps {
  menu: any
}

@inject('menuStore')
@observer
export default class Home extends React.Component<HomePorps, {}> {  // debugger

  public menuStore: MenuStore

  @observable public url: string

  constructor (props: any) {
    super(props)
  }

  public componentWillReceiveProps () {
    const map: any = Util.getHrefMap(location.search)
    if (map && map.href) {
      this.url = decodeURIComponent(map.href)
    }
  }

  public render () {
    return (
      <div className="home-main">
        {
          (this.url) ? (
            <iframe
              className="home-frame"
              src={(this.url.indexOf('http://') > -1) ? (this.url) : (`http://${this.url}`)} >
            </iframe>
          ) : ('')
        }
      </div>
    )
  }
}
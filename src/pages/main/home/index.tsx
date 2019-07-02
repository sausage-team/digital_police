import * as React from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react';
import { MenuStore } from 'src/stores/modules/menu'

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
    this.menuStore = props.menuStore
    this.url = this.menuStore.getUrl()
  }

  public componentWillReceiveProps () {
    this.url = this.menuStore.getUrl()
  }

  public render () {
    return (
      <div className="home-main">
        <iframe className="home-frame" src={`http://${this.url}`} ></iframe>
      </div>
    )
  }
}
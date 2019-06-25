import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { HomeStore } from 'src/stores/modules/home'

export interface HomeProps extends RouteComponentProps<{}> {
  home: HomeStore
}

@inject('home')
@observer
export default class Home extends React.Component<HomeProps, {}> {
  public render () {
    return (
      <div>home</div>
    )
  }
}
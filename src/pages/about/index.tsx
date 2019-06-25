import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { HomeStore } from 'src/stores/modules/home'

export interface AboutProps extends RouteComponentProps<{}> {
  home: HomeStore
}

@inject('home')
@observer
export default class About extends React.Component<AboutProps, {}> {
  
  public render () {
    console.log()
    return (
      <div>about{this.props.home.getId()}</div>
    )
  }
}
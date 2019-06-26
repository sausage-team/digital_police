import { observer, inject } from 'mobx-react'
import * as React from 'react'

import HeaderNav from 'src/components/header'
import { UserService } from 'src/services/user'
import { RouteComponentProps } from 'react-router';

interface LoginProps extends RouteComponentProps<{}> {
  userService: UserService
}

@inject('userService')
@observer
export default class Main extends React.Component<LoginProps, {}> {

  public userService: UserService

  constructor (props: any) {
    super(props)
    this.userService = props.userService
  }

  public componentDidMount () {
    this.getData()
  }

  public getData = async () => {
    this.userService.testUser()
  }

  public render () {
    return (
      <div className="main">
        <HeaderNav />
        <div className="main-body">
          main work
        </div>
      </div>
    )
  }
}
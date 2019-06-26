import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject()
@observer
class HeaderNav extends React.Component<RouteComponentProps<{}>, {}> {
  constructor (props: any) {
    super(props)
  }

  public render () {
    return (
      <div className="header-main">
        header works
      </div>
    )
  }
}

export default withRouter(HeaderNav)
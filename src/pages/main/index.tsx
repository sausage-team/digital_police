import { observer } from 'mobx-react'
import * as React from 'react'

import HeaderNav from 'src/components/header'

@observer
export default class Main extends React.Component<{}, {}> {
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
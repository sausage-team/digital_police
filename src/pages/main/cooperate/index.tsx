import * as React from 'react'
import { Button } from 'antd'

class Cooperate extends React.Component<{}, {}> {

  public render () {
    return (
      <div className="cooperate-main">
        <div className="cooperate-con">
          <div className="coo-header">
            <i></i>
            <span>派出所民警</span>
          </div>
          <div className="coo-body">
            <Button type="primary"></Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Cooperate
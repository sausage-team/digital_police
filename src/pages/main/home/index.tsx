import * as React from 'react'

export default class Home extends React.Component<{}, {}> {

  public render () {
    return (
      <div className="home-main">
        <iframe className="main-frame" src="http://www.baidu.com"></iframe>
      </div>
    )
  }
}
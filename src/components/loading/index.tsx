import * as React from 'react'
import { Spin } from 'antd'
import * as Loadable from 'react-loadable'

export default class Loading extends React.Component<Loadable.LoadingComponentProps> {
  public render () {
    return (
      <div className="spin-main">
        <Spin tip="加载中，请稍后..." spinning />
      </div>
    )
  }
}
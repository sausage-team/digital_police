import * as React from 'react'
import { Spin } from 'antd'

export default class Loading extends React.Component<{}, {}> {
  public render () {
    return (
      <Spin tip="加载中，请稍后..." spinning />
    )
  }
}
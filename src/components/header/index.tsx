import * as React from 'react'
import { inject, observer } from 'mobx-react'

export interface HeaderProps {
  toggle: () => void
}

@inject()
@observer
export default class HeaderNav extends React.Component<HeaderProps, {}> {
  constructor (props: any) {
    super(props)
  }

  public toggleMenu = () => {
    this.props.toggle()
  }

  public render () {
    return (
      <div className="header-main" onClick={this.toggleMenu}>
        header works
      </div>
    )
  }
}

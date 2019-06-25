import * as React from 'react'

class App extends React.Component<{}, {}> {

  public render () {
    return (
      <div className="main">
        {this.props.children}
      </div>
    )
  }
}

export default App
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Loading from '../components/loading'
import { observable } from 'mobx';
import { LoaderStore } from '../stores/modules/loader'

@inject('loader')
@observer
class App extends React.Component<{}, {}> {

  @observable public loaderStore: LoaderStore

  constructor (props: any) {
    super(props)
    this.loaderStore = props.loader
  }

  public render () {
    return (
      <div className="app">
        {this.props.children}
        <div className={`loading-box ${(this.loaderStore.getLoading) ? ('show') : ('')}`}>
          <Loading />
        </div>
      </div>
    )
  }
}

export default App
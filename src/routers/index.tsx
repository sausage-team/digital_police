
import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import * as React from 'react'
import { Route, Router, Switch } from 'react-router'

import About from '../pages/about'
import Home from '../pages/home'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)

export default class AppRouter extends React.Component<{}, {}> {
  public render () {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            exact={true}
            strict={true}
            component={Home}
          />
          <Route
            path="/home"
            exact={true}
            component={Home}
          />
          <Route
            path="/about"
            component={About}
          />
        </Switch>
      </Router>
    )
  }
}
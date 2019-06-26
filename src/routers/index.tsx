
import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import * as React from 'react'
import { Route, Router, Switch, Redirect } from 'react-router'

import Login from 'src/pages/login'
import Main from 'src/pages/main'

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
            exact
            component={Main}
          />
          <Route
            path="/main"
            component={Main}
          />
          <Route
            path="/login"
            component={Login}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}

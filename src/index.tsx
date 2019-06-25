import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './pages/App'
import registerServiceWorker from './pwa/registerServiceWorker'
import AppRouter from './routers'
import stores from './stores'

import 'antd/dist/antd.css'
import './styles/css/index.css'

ReactDOM.render(
  <Provider {...stores}>
    <App>
      <AppRouter />
    </App>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

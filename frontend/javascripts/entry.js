import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { syncHistoryWithStore } from 'react-router-redux'

import App from 'app'
import Serials from 'serials'
import Serial from 'serials/serial'
import SerialCreate from 'serials/create'

import Season from 'season'
import Episode from 'episode'

import reducer from 'store/reducers'
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
const history = syncHistoryWithStore(hashHistory, store)


render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='serials' component={Serials}/>
        <Route path='serials/:id' component={Serial} />
        <Route path='serial/create' component={SerialCreate} />
        <Route path='seasons/:id' component={Season} />
        <Route path='episodes/:id' component={Episode} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

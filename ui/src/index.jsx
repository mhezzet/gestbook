import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Store from './store'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Store>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Store>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

import React from 'react'
import { render } from 'react-dom'
import { Match, BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import AsyncRoute from './components/AsyncRoute'
import preload from '../public/data.json'

if (global) {
  global.System = { import () {} }
}

render(
  <BrowserRouter>
    <Provider store={store}>
      <div className='app'>
        <Match
          exactly
          pattern='/'
          component={(props) => <AsyncRoute props={props} loadingPromise={System.import('./components/Landing')} />}
        />
        <Match
          pattern='/search'
          component={(props) => {
            return <AsyncRoute
              props={Object.assign({shows: preload.shows}, props)}
              loadingPromise={System.import('./components/Search')}
            />
          }}
        />
        <Match
          pattern='/details/:id'
          component={(props) => {
            const show = preload.shows.filter((show) => props.params.id === show.imdbID)
            return <AsyncRoute
              props={Object.assign({show: show[0]}, props)}
              loadingPromise={System.import('./components/Details')}
            />
          }}
        />
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
)

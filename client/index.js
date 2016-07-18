import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import thunk from 'redux-thunk'

import App from './public/components/app'
import reducer from './public/reducers'
import NavBar from './public/components/navBar'
import Search from './public/containers/search'
import Add from './public/containers/add'
import GameListHome from './public/containers/gameListHome'
import SearchHome from './public/containers/searchHome'

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);

 render((
    <Provider store={createStoreWithMiddleWare(reducer)}>
      <Router history={browserHistory}>
        
        <Route path="/" component={App} >
          <IndexRoute component={Search} />
          <Route path="/Search" component={Search} />
          <Route path="/Add" component={Add} />
        </Route>
        
        <Route path="/NavBar" component={NavBar} >
          <Route path="/SearchHome" component={SearchHome} />
          <Route path="/GameListHome" component={GameListHome} />
        </Route>

      </Router>
    </Provider>
  ), document.getElementById('app'))
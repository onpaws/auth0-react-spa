import React from 'react'
import NavBar from './NavBar'
import { useAuth0 } from './react-auth0-spa';
import { Router, Route, Switch } from 'react-router-dom';
import Profile from './Profile';
import history from './history';

const App = () => {
  const { loading }  = useAuth0();

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="app">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  )
}


export default App
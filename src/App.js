import React from 'react'
import { Router, Route, Link } from 'react-router-dom'
import history from './history'
import { login, logout, user, isLoggedIn } from './auth'
import Callback from './Callback'

const App = () => {
  return (
    <Router history={history}>
      <nav>
        <Link to='/'>Home</Link>{' '}
        <Link to='/about/'>About</Link>{' '}
        <Link to='/account/'>Account</Link>{' '}
        {isLoggedIn
          ? <a href='#logout' onClick={e => { logout(); e.preventDefault() }}>
              Log Out
            </a>
          : <a href='#login' onClick={e => { login(); e.preventDefault() }}>Log In</a>
        }
      </nav>
      <Route path='/' exact render={(props) => <Home {...props} user={user} />} />
      <Route path='/about' component={About} />
      <Route path='/callback' render={Callback} />
      <Route path='/account' render={(props) => <Account {...props} user={user} />} />
      <Route path='/error' render={() => <p>Error :(</p>} />
    </Router>
  )
}


export default App

const Home = ({ user }) => <p>Hi, {user.name ? user.name : 'friend'}!</p>
const Account = ({ user }) => <p>{JSON.stringify(user)}</p>
const About = () => <p>About</p>

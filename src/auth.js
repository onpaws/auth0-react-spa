import auth0 from 'auth0-js'
import history from './history'

const auth = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENTID,
  redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
  responseType: 'token id_token',
  scope: 'openid profile email',
})

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

export let user = {}
export let isLoggedIn = false;

export const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true'
}

export const login = () => {
  auth.authorize()
}

const setSession = (cb = () => { }) => (err, authResult) => {
  if (err) {
    history.push('/error')
    cb()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem('isLoggedIn', true)
    isLoggedIn = true;
    history.push('/')
    cb()
  }
}

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback()
  auth.checkSession({}, setSession(callback))
}

export const parseHashFromAuth0 = () => {
  auth.parseHash(setSession())
}

export const logout = () => {
  localStorage.setItem('isLoggedIn', false)
  auth.logout()
}
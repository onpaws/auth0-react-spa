## Minimal TypeScript React app trying to use Auth0

I noticed Auth0 has published a module that seems intended for SPAs to work with Auth0 logon services.

~~I'm not sure why but right now this module seems to require 3rd party cookies to be enabled.~~

~~TODO: Find out if [refresh token rotation](https://auth0.com/blog/securing-single-page-applications-with-refresh-token-rotation/) will help with this?~~

Answer: localStorage is needed to resolve this limitation. [More info](https://community.auth0.com/t/trying-the-new-refresh-token-rotation-in-a-react-spa-are-3rd-party-cookies-supposed-to-be-required/41151/4)


### User creds
```
Username: demo@example.com
Password: Password1
```

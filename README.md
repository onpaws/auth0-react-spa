## React and reading values on startup

I followed the Auth0 [Gatsby guide](https://auth0.com/blog/securing-gatsby-with-auth0/), except today I don't care about Gatsby and rather went with a normal Create React App SPA. 
Along the way I setup Auth0 with a new tenant, added a user, and got SPA logon working. 
Things are working _almost_ perfectly, but there is a cosmetic bug I'm trying to squash. 

Repro steps:
1) User clicks Log In. 
2) App (`auth0-js`'s .auth()) redirects them to Auth0 where user types in a working user/pass*.
3) User hits Submit and Auth0 redirects them back to my app at http://localhost:3000/callback. 
4) The user's email address displays in the page body (yay, Auth0 user profile is being read & displayed in my app).

The bug: at this point the `Log In` link is stale - it should read `Log Out` instead.

auth.js's exports `isLoggedIn` for this exact purpose - to provide a means for App.js to track and show the correct login/logout link. Because auth.js is where we communicate to Auth0, it seems like the natural place to export a variable to track Auth0 related stuff.

Problem is, App.js appears to only read `isLoggedIn` once on startup. 
Unlike the user profile object which updates in the expected way...this one stays the same.

Do I need a callback? Should I use a class? Is this approach dumb? :)
How might I handle differently/better?


### User creds
```
Username: demo@example.org
Password: Password1
```
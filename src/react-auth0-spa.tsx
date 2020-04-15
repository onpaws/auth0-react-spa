import React, { useState, useEffect, useContext, createContext } from "react";
import createAuth0Client, { 
  Auth0Client,
  Auth0ClientOptions, 
  PopupLoginOptions, 
  RedirectLoginResult, 
  IdToken, 
  getIdTokenClaimsOptions,
  RedirectLoginOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions
 } from "@auth0/auth0-spa-js";

interface IAuth0Context {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup(options: PopupLoginOptions): Promise<void>;
  handleRedirectCallback(): Promise<RedirectLoginResult>;
  getIdTokenClaims(options?: getIdTokenClaimsOptions): Promise<IdToken>;
  loginWithRedirect(options: RedirectLoginOptions): Promise<void>;
  getTokenSilently(options?: GetTokenSilentlyOptions): Promise<string | undefined>;
  getTokenWithPopup(options?: GetTokenWithPopupOptions): Promise<string | undefined>;
  logout(options?: LogoutOptions): void;
}

interface Auth0ProviderOptions {
  children: React.ReactElement;
  onRedirectCallback?(result: RedirectLoginResult): void;
}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = createContext<IAuth0Context | null>(null);
export const useAuth0 = () => useContext(Auth0Context)!;
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (options: PopupLoginOptions) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(options);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client!.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    const result = await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
    return result;
  };

  return (
    <Auth0Context.Provider value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (options: getIdTokenClaimsOptions | undefined) =>
          auth0Client!.getIdTokenClaims(options),
        loginWithRedirect: (options: RedirectLoginOptions) =>
          auth0Client!.loginWithRedirect(options),
        getTokenSilently: (options: GetTokenSilentlyOptions | undefined) =>
          auth0Client!.getTokenSilently(options),
        getTokenWithPopup: (options: GetTokenWithPopupOptions | undefined) =>
          auth0Client!.getTokenWithPopup(options),
        logout: (options: LogoutOptions | undefined) => auth0Client!.logout(options)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
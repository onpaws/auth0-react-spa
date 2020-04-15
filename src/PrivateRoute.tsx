import React, { useEffect, Component } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";

interface IPrivateRouteOptions {
  component: React.FC,
  path: string,
}

type PrivateRouteProps = IPrivateRouteOptions;

const PrivateRoute = ({ component, path, ...rest }: PrivateRouteProps) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fn = async () => {
      if (loading || !loginWithRedirect) {
        return
      }

      if (!isAuthenticated) {
        await loginWithRedirect({
          redirect_uri: "",
          appState: { targetUrl: path }
        });
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, path]);
  
  const render = (props: RouteComponentProps<{}>) =>
    <Component {...props} />;

  return <Route path={path} render={render} component={component} {...rest} />;
};

export default PrivateRoute;
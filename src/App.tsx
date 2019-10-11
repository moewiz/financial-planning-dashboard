import React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import { withTracker } from './utils/withTracker';
import { myTheme } from './common/themes';

import configureStore from './stores/configureStore';

// Import layouts
import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';

// Import Pages
import { Home, LoginPage, Client } from './pages';
import ApiUtils from './utils/apiUtils';

export const { store, persistor } = configureStore();

interface RouteProps {
  component: any;
  path?: string;
  exact?: boolean;

  [propsName: string]: any;
}

const PublicRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps: RouteComponentProps) => (
        <LoginLayout>
          <Component {...matchProps} />
        </LoginLayout>
      )}
    />
  );
};

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, ...rest } = props;

  if (!ApiUtils.getAccessToken()) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <MainLayout>
      <Route {...rest} component={withTracker(Component)} />
    </MainLayout>
  );
};

const NotFound: React.FC<RouteProps> = () => {
  return <Redirect to="/" />;
};

const AppRouter = (): JSX.Element => {
  return (
    <ThemeProvider theme={myTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <PublicRoute exact path="/sign-in" component={LoginPage} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/client/:clientId/:tagName/:tabName" component={Client} />
              <PrivateRoute expact path="/client/:clientId" component={Client} />
              <PrivateRoute component={NotFound} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default AppRouter;

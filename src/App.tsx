import React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import { myTheme } from './common/themes';

import configureStore from './stores/configureStore';

// Import layouts
import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';

// Import Pages
import { Home, LoginPage } from './pages';
import ApiUtils from './utils/apiUtils';

export const { store, persistor } = configureStore();

interface DefaultProps {
  component: any;
  path?: string;
  exact?: boolean;

  [propsName: string]: any;
}

const PublicRoute: React.SFC<DefaultProps> = (props) => {
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

const PrivateRoute: React.SFC<DefaultProps> = (props) => {
  const { component: Component, ...rest } = props;
  if (!ApiUtils.getAccessToken()) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <Route
      {...rest}
      render={(matchProps: RouteComponentProps) => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  );
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
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default AppRouter;

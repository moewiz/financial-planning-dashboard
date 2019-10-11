import React from 'react';
import { HomePage } from './styled';
import { RouteComponentProps } from 'react-router';

class Home extends React.PureComponent<RouteComponentProps> {
  public render(): JSX.Element {
    return <HomePage />;
  }
}

export default Home;

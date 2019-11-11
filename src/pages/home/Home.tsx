import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
const { Content } = Layout;

import { HomeDesc, HomePage } from './styled';
import { RouteComponentProps } from 'react-router';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../reducers/reducerTypes';

class Home extends React.PureComponent<RouteComponentProps & { fullName: string }> {
  public render(): JSX.Element {
    const { fullName } = this.props;

    return (
      <HomePage>
        <Content>
          <Heading level={2} className="subHeading" titleText="Welcome back" />
          <HomeDesc>Mr. {fullName || 'Always Right'}</HomeDesc>
        </Content>
      </HomePage>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  fullName: state.auth.get('fullName'),
});

export default connect(mapStateToProps)(Home);

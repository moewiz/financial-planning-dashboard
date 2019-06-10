import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import Header from '../Header';
import Sidebar from '../Sidebar';

const { Content } = Layout;
import { MainLayoutContent, LayoutMain } from './styled';
import { initializeGA } from '../../utils/GA';
import { RootState } from '../../reducers/reducerTypes';

interface MainLayoutProp {
  userId: string;
  fullName: string;
  avatarUrl: string;
  children: React.ReactNode;
}

class MainLayout extends React.PureComponent<MainLayoutProp> {
  public componentDidMount() {
    const { userId } = this.props;

    initializeGA(userId);
  }

  public render(): React.ReactNode {
    const { fullName, avatarUrl, children } = this.props;

    return (
      <LayoutMain>
        <Sidebar />
        <MainLayoutContent>
          <Header fullName={fullName} avatarUrl={avatarUrl} />
          <Content>{children}</Content>
        </MainLayoutContent>
      </LayoutMain>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userId: state.auth.get('userId'),
  fullName: state.auth.get('fullName'),
  avatarUrl: state.auth.get('avatarUrl'),
});

export default connect(mapStateToProps)(MainLayout);

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
  children: React.ReactNode;
}

class MainLayout extends React.PureComponent<MainLayoutProp> {
  public componentDidMount() {
    const { userId } = this.props;

    initializeGA(userId);
  }

  public render(): React.ReactNode {
    const { children } = this.props;
    return (
      <LayoutMain>
        <Sidebar />
        <MainLayoutContent>
          <Header />
          <Content>{children}</Content>
        </MainLayoutContent>
      </LayoutMain>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userId: state.auth.get('userId'),
});

export default connect(mapStateToProps)(MainLayout);

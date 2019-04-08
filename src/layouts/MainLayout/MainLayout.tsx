import React from 'react';
import { Layout } from 'antd';

import Header from '../Header';
import Sidebar from '../Sidebar';

const { Content } = Layout;
import { MainLayoutContent, LayoutMain } from './styled';
import { initializeGA } from '../../utils/GA';

class MainLayout extends React.PureComponent {
  public componentDidMount() {
    initializeGA();
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

export default MainLayout;

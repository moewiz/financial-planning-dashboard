import React from 'react';
import { Layout } from 'antd';

import Header from '../Header';
import Sidebar from '../Sidebar';

const { Content } = Layout;
import { MainLayoutContent, LayoutMain } from './styled';
class MainLayout extends React.PureComponent {
  public render(): JSX.Element {
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

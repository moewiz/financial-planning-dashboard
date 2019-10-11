import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import Header from '../Header';
import Sidebar from '../Sidebar';

const { Content } = Layout;
import { MainLayoutContent, LayoutMain } from './styled';
import { initializeGA } from '../../utils/GA';
import { RootState } from '../../reducers/reducerTypes';
import { Client } from '../../reducers/client';

interface MainLayoutProp {
  userId: string;
  clients: Client[];
  fullName: string;
  avatarUrl: string;
  children: React.ReactNode;
}

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

window.$crisp = window.$crisp || {};

class MainLayout extends React.PureComponent<MainLayoutProp> {
  public componentDidMount() {
    const { userId } = this.props;

    initializeGA(userId);
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '6cd2832d-41b0-40da-af26-d8de89c2378b';

    // tslint:disable-next-line:only-arrow-functions
    (function() {
      const d = document;
      const s = d.createElement('script');

      s.src = 'https://client.crisp.chat/l.js';
      s.async = Boolean(1);
      d.getElementsByTagName('head')[0].appendChild(s);
    })();
  }

  public render(): React.ReactNode {
    const { clients, fullName, avatarUrl, children } = this.props;

    return (
      <LayoutMain>
        <Sidebar clients={clients} />
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
  clients: state.client.get('clients'),
  fullName: state.auth.get('fullName'),
  avatarUrl: state.auth.get('avatarUrl'),
});

export default connect(mapStateToProps)(MainLayout);

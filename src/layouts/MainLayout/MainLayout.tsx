import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import Header from '../Header';
import Sidebar from '../Sidebar';

const { Content } = Layout;
import { MainLayoutContent, LayoutMain } from './styled';
import { initializeGA } from '../../utils/GA';
import { RootState, StandardAction } from '../../reducers/reducerTypes';
import { FetchDataEntryPayload, FetchDataEntryAction, ClientActions } from '../../reducers/client';
import { Dispatch, bindActionCreators } from 'redux';

interface MainLayoutProp {
  userId: string;
  children: React.ReactNode;
  fetchDataEntry: (payload: FetchDataEntryPayload) => FetchDataEntryAction;
}

class MainLayout extends React.PureComponent<MainLayoutProp> {
  public componentDidMount() {
    const { userId, fetchDataEntry } = this.props;

    initializeGA(userId);

    // for testing
    fetchDataEntry({ clientId: '123456', taskName: 'New', tabName: 'Current' });
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

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      fetchDataEntry: ClientActions.fetchDataEntry,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);

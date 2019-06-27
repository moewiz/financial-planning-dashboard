import React, { PureComponent } from 'react';
import { Drawer } from 'antd';
import { isFunction } from 'lodash';
import { RootState, StandardAction } from '../../../reducers/reducerTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { ClientActions, CloseDrawerAction, StrategyEntry } from '../../../reducers/client';
import { connect } from 'react-redux';
interface DrawerContainerProps {
  drawerOpen: boolean;
  drawerTitle: string;

  closeDrawer?: (title: string) => CloseDrawerAction;
}
class DrawerContainer extends PureComponent<DrawerContainerProps> {
  public onCloseDrawer = () => {
    const { closeDrawer } = this.props;
    if (isFunction(closeDrawer)) {
      closeDrawer('');
    }
  }

  public render() {
    const { drawerOpen, drawerTitle } = this.props;
    return (
      <Drawer title={drawerTitle} width={720} onClose={this.onCloseDrawer} visible={drawerOpen}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  drawerOpen: state.client.get('drawerOpen'),
  drawerTitle: state.client.get('drawerTitle'),
});

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      closeDrawer: ClientActions.closeDrawer,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContainer);

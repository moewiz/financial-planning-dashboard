import React, { PureComponent } from 'react';
import { Drawer } from 'antd';
import { isFunction } from 'lodash';
import { RootState, StandardAction } from '../../../reducers/reducerTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { ClientActions, CloseDrawerAction } from '../../../reducers/client';
import { connect } from 'react-redux';
import MainDrawerContent from './MainDrawerContent';

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
      <Drawer width={1000} onClose={this.onCloseDrawer} visible={drawerOpen}>
        <h4>{drawerTitle}</h4>
        <p>
          Our insurance recommendations are based on our analysis of your circumstances and financial situation. The
          following table illustrates your required level of cover.
        </p>
        <MainDrawerContent />
        <p>
          Note: Recommended sums insured have been rounded to take advantage of pricing point discounts with insurance
          companies. In addition, Life cover must be equal to or greater than TPD recommended cover.
        </p>
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

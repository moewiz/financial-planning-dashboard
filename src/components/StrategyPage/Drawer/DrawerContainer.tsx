import React, { PureComponent } from 'react';
import { Drawer, Icon, Button, Pagination, Spin } from 'antd';
import { isFunction } from 'lodash';
import { RootState, StandardAction } from '../../../reducers/reducerTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainDrawerContent from './MainDrawerContent';

import { DrawerTitle, DrawerSubContent, DrawerNote,
  ActionDrawerGeneral, DrawerFooter,
 } from './styled';
import { CloseDrawerAction, DrawerActions } from '../../../reducers/drawer';

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
      <Drawer width={1100} onClose={this.onCloseDrawer} visible={drawerOpen}>
        <DrawerTitle>
          {drawerTitle} <Spin size="small" />
        </DrawerTitle>

        <DrawerSubContent>
          Our insurance recommendations are based on our analysis of your circumstances and financial situation. The
          following table illustrates your required level of cover.
        </DrawerSubContent>
        <MainDrawerContent />
        <DrawerFooter>
          <DrawerNote>
            Note: Recommended sums insured have been rounded to take advantage of pricing point discounts with
            insurance companies. In addition, Life cover must be equal to or greater than TPD recommended cover.
          </DrawerNote>
          <Pagination defaultCurrent={1} total={50} />
        </DrawerFooter>
        <ActionDrawerGeneral>
          <Button htmlType={'button'} type={'default'}>
            <Icon type="close" />
            <span>Discard</span>
          </Button>
          <Button htmlType={'submit'} type={'primary'}>
            <Icon type="check" />
            <span>Save</span>
          </Button>
        </ActionDrawerGeneral>
      </Drawer>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  drawerOpen: state.drawer.get('drawerOpen'),
  drawerTitle: state.drawer.get('drawerTitle'),
});

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      closeDrawer: DrawerActions.closeDrawer,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContainer);

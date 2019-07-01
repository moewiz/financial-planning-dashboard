import React, { PureComponent } from 'react';
import { Drawer, Icon, Button, Pagination, Spin } from 'antd';
import { isFunction } from 'lodash';
import { RootState, StandardAction } from '../../../reducers/reducerTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainDrawerContent from './MainDrawerContent';

import { DrawerTitle, DrawerSubContent, DrawerNote, ActionDrawerGeneral, DrawerFooter } from './styled';
import { CloseDrawerAction, DrawerActions } from '../../../reducers/drawer';

interface DrawerData {
  title: string;
  subTitle?: string;
  footnote?: string;
  columns: string[];
  tableData: object[][];
}

interface DrawerContainerProps {
  drawerOpen: boolean;
  loading: boolean;
  drawerData: DrawerData;
  tabActive: string;

  closeDrawer?: (tabActive: string) => CloseDrawerAction;
}

class DrawerContainer extends PureComponent<DrawerContainerProps> {
  public onCloseDrawer = () => {
    const { closeDrawer } = this.props;
    if (isFunction(closeDrawer)) {
      closeDrawer('');
    }
  }

  public renderDrawer = () => {
    const { drawerData, loading } = this.props;
    const { title, subTitle, footnote } = drawerData;
    return (
      <>
        <DrawerTitle>
          {title} {loading && <Spin size="small" />}
        </DrawerTitle>

        <DrawerSubContent>{subTitle}</DrawerSubContent>
        <MainDrawerContent />
        <DrawerFooter>
          <DrawerNote>{footnote}</DrawerNote>
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
      </>
    );
  }

  public render() {
    const { drawerOpen, drawerData, loading } = this.props;

    return (
      <Drawer width={1100} onClose={this.onCloseDrawer} visible={drawerOpen} destroyOnClose={true}>
        {loading ? <Spin size="small" /> : drawerData ? this.renderDrawer() : null}
      </Drawer>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const tabActive = state.drawer.get('tabActive');
  const drawerData: DrawerData = state.drawer.get(tabActive);

  return {
    drawerOpen: state.drawer.get('drawerOpen'),
    loading: state.drawer.get('loading'),
    tabActive: state.drawer.get('tabActive'),
    drawerData,
  };
};

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

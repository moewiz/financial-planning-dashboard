import React, { PureComponent } from 'react';
import { Drawer, Icon, Button, Pagination, Spin } from 'antd';
import { isFunction } from 'lodash';
import { RootState, StandardAction } from '../../../reducers/reducerTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainDrawerContent from './MainDrawerContent';

import { DrawerTitle, DrawerSubContent, DrawerNote, ActionDrawerGeneral, DrawerFooter } from './styled';
import { ActiveTabAction, CloseDrawerAction, DrawerActions, ChangePageAction } from '../../../reducers/drawer';

export interface DrawerData {
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
  page: number;

  closeDrawer?: (tabActive: string) => CloseDrawerAction;
  activeTab: (tabActive: string) => ActiveTabAction;
  changePage: (page: number) => ChangePageAction;
}

class DrawerContainer extends PureComponent<DrawerContainerProps> {
  public onCloseDrawer = () => {
    const { closeDrawer } = this.props;
    if (isFunction(closeDrawer)) {
      closeDrawer('');
    }
  }

  public onPageChange: (page: number, pageSize?: number) => void = (page) => {
    const { changePage } = this.props;
    changePage(page);
  }

  public renderDrawer = () => {
    const { drawerData, loading, activeTab, tabActive, page } = this.props;
    const { title, subTitle, footnote } = drawerData;
    const total = drawerData.tableData && drawerData.tableData.length ? drawerData.tableData.length * 10 : 10;

    return (
      <>
        <DrawerTitle>
          {title} {loading && <Spin size="small" />}
        </DrawerTitle>

        <DrawerSubContent>{subTitle}</DrawerSubContent>

        {/* Drawer Table */}
        <MainDrawerContent activeTab={activeTab} tabActive={tabActive} drawerData={drawerData} page={page} />

        <DrawerFooter>
          <DrawerNote>{footnote}</DrawerNote>
          <Pagination current={page} total={total} onChange={this.onPageChange} />
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
  const page = state.drawer.get('page');
  const drawerData: DrawerData = state.drawer.get(tabActive);

  return {
    drawerOpen: state.drawer.get('drawerOpen'),
    loading: state.drawer.get('loading'),
    tabActive: state.drawer.get('tabActive'),
    page,
    drawerData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<StandardAction<any>>) =>
  bindActionCreators(
    {
      closeDrawer: DrawerActions.closeDrawer,
      activeTab: DrawerActions.activeTab,
      changePage: DrawerActions.changePage,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContainer);

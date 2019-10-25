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
  clientData: DrawerData;
  currentData: DrawerData;
  partnerData?: DrawerData;
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
    const { clientData, partnerData, currentData, loading, activeTab, tabActive, page } = this.props;
    const { title, subTitle, footnote } = currentData;
    const total = currentData.tableData && currentData.tableData.length ? currentData.tableData.length * 10 : 10;

    return (
      <>
        <DrawerTitle>
          {title} {loading && <Spin size="small" />}
        </DrawerTitle>

        <DrawerSubContent>{subTitle}</DrawerSubContent>

        {/* Drawer Table */}
        <MainDrawerContent
          activeTab={activeTab}
          tabActive={tabActive}
          clientData={clientData}
          partnerData={partnerData}
          page={page}
        />

        <DrawerFooter>
          <DrawerNote>{footnote}</DrawerNote>
          <Pagination current={page} total={total} onChange={this.onPageChange} />
        </DrawerFooter>
        <ActionDrawerGeneral>
          <Button htmlType={'button'} type={'default'} onClick={this.onCloseDrawer}>
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
    const { drawerOpen, loading, currentData } = this.props;

    return (
      <Drawer
        width={1100}
        onClose={this.onCloseDrawer}
        visible={drawerOpen}
        destroyOnClose={true}
        className={'strategy-drawer'}
      >
        {loading ? <Spin size="small" /> : currentData ? this.renderDrawer() : null}
      </Drawer>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const tabActive = state.drawer.get('tabActive');
  const page = state.drawer.get('page');
  const currentData: DrawerData = state.drawer.get(tabActive);
  const clientData: DrawerData = state.drawer.get('client');
  const partnerData: DrawerData = state.drawer.get('partner');

  return {
    drawerOpen: state.drawer.get('drawerOpen'),
    loading: state.drawer.get('loading'),
    tabActive,
    page,
    currentData,
    clientData,
    partnerData,
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

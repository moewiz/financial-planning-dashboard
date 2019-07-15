import React, { PureComponent } from 'react';
import DrawerTable from './DrawerTable';
import { MainDrawerSection, TabsCustomized, TabsPaneCustomized } from './styled';
import { ActiveTabAction } from '../../../reducers/drawer';
import { DrawerData } from './DrawerContainer';

interface MainDrawerContentProps {
  tabActive: string;
  page: number;
  drawerData: DrawerData;
  activeTab: (tabActive: string) => ActiveTabAction;
}

const getRows = (page: number, pages: any[][]) => pages[page - 1];

class MainDrawerContent extends PureComponent<MainDrawerContentProps> {
  public state = {
    animationCn: '',
  };

  public componentWillReceiveProps(nextProps: Readonly<MainDrawerContentProps>, nextContext: any): void {
    const { tabActive: tab, page } = this.props;
    const { tabActive: nextTab, page: nextPage } = nextProps;

    // change tab
    if (tab !== nextTab) {
      this.setState({ animationCn: '' });
    } else {
      // slide to left
      if (nextPage > page) {
        this.setState({ animationCn: 'slide-right' });
      } else {
        this.setState({ animationCn: 'slide-left' });
      }
    }
  }

  public callback = (tabActive: string) => {
    const { activeTab } = this.props;
    this.setState({ animationCn: '' });
    activeTab(tabActive);
  }

  public render() {
    const { tabActive, drawerData, page } = this.props;
    const { animationCn } = this.state;
    const allRows = drawerData && drawerData.tableData ? drawerData.tableData : [];
    const rows = getRows(page, allRows);

    return (
      <MainDrawerSection>
        <TabsCustomized defaultActiveKey={tabActive} onChange={this.callback}>
          <TabsPaneCustomized tab="Client" key="client">
            <DrawerTable columns={drawerData.columns} rows={rows} animationCn={animationCn} />
          </TabsPaneCustomized>
          <TabsPaneCustomized tab="Partner" key="partner">
            <DrawerTable columns={drawerData.columns} rows={rows} animationCn={animationCn} />
          </TabsPaneCustomized>
        </TabsCustomized>
      </MainDrawerSection>
    );
  }
}

export default MainDrawerContent;

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
  public callback = (tabActive: string) => {
    const { activeTab } = this.props;
    activeTab(tabActive);
  }

  public render() {
    const { tabActive, drawerData, page } = this.props;
    const allRows = drawerData && drawerData.tableData ? drawerData.tableData : [];
    const rows = getRows(page, allRows);

    return (
      <MainDrawerSection>
        <TabsCustomized defaultActiveKey={tabActive} onChange={this.callback}>
          <TabsPaneCustomized tab="Client" key="client">
            <DrawerTable columns={drawerData.columns} rows={rows} />
          </TabsPaneCustomized>
          <TabsPaneCustomized tab="Partner" key="partner">
            <DrawerTable columns={drawerData.columns} rows={rows} />
          </TabsPaneCustomized>
        </TabsCustomized>
      </MainDrawerSection>
    );
  }
}

export default MainDrawerContent;

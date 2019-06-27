import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import DrawerTable from './DrawerTable';

const { TabPane } = Tabs;

class MainDrawerContent extends PureComponent {
  public callback = (key: any) => {
    console.log(key);
  }

  public render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Client" key="1">
          <DrawerTable />
        </TabPane>
        <TabPane tab="Partner" key="2">
          <DrawerTable />
        </TabPane>
      </Tabs>
    );
  }
}

export default MainDrawerContent;

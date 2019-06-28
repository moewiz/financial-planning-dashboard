import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import DrawerTable from './DrawerTable';

const { TabPane } = Tabs;

const columns = [
  '2019/20',
  '2020/21',
  '2021/22',
  '2022/23',
  '2023/24',
  '2024/25',
  '2025/26',
  '2026/27',
  '2027/28',
  '2028/29',
];

class MainDrawerContent extends PureComponent {
  public callback = (key: any) => {
    console.log(key);
  }

  public render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Client" key="1">
          <DrawerTable columns={columns} tableData={[]} />
        </TabPane>
        <TabPane tab="Partner" key="2">
          <DrawerTable columns={columns} tableData={[]} />
        </TabPane>
      </Tabs>
    );
  }
}

export default MainDrawerContent;

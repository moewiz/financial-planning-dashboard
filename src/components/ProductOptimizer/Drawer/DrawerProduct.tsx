import React, { PureComponent } from 'react';
import { Button, Drawer, Icon, Table } from 'antd';

import { DrawerTitle, ActionDrawerGeneral } from '../../StrategyPage/Drawer/styled';
import { InputSearch, TopSearch } from '../../../layouts/Header/styled';
import { TableEntryContainer } from '../../../pages/client/styled';

interface DrawerProductProps {
  isOpen: boolean;
  close: () => void;
}

const data = [
  {
    name: 'Fund DF',
    value: '10,000',
    percentage: '100%',
  },
];

class DrawerProduct extends PureComponent<DrawerProductProps> {
  public columns = [
    {
      title: 'Fund Name',
      dataIndex: 'name',
      type: 'text',
      key: '0',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      type: 'number',
      key: '1',
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      type: 'number',
      key: '2',
    },
  ];

  public renderDrawer = () => {
    return this.renderNewDrawer();
  }

  // tslint:disable-next-line:no-empty
  public renderLinkedDrawer = () => {};

  public renderNewDrawer = () => {
    const total = {
      name: 'Total',
      value: '10,000',
      percentage: '100%',
    };

    return (
      <>
        <DrawerTitle>My Product</DrawerTitle>
        <ActionDrawerGeneral drawer>
          <TopSearch border>
            <Icon type="search" />
            <InputSearch placeholder="Search Product" />
          </TopSearch>
          <TopSearch border>
            <Icon type="search" />
            <InputSearch placeholder="Search Fund" />
          </TopSearch>
        </ActionDrawerGeneral>
        <TableEntryContainer drawer>
          <Table
            className={`table-general drawer-fund-table`}
            columns={this.columns}
            dataSource={[...data, total]}
            pagination={false}
          />
        </TableEntryContainer>
        <ActionDrawerGeneral visible>
          <Button htmlType={'submit'} type={'primary'}>
            <span>Save</span>
          </Button>
        </ActionDrawerGeneral>
      </>
    );
  }

  public render() {
    const { close, isOpen } = this.props;

    return (
      <Drawer width={1100} onClose={close} visible={isOpen} destroyOnClose={true}>
        {this.renderDrawer()}
      </Drawer>
    );
  }
}

export default DrawerProduct;

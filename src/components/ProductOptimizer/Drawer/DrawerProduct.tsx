import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { Button, Drawer, Tabs } from 'antd';
const { TabPane } = Tabs;

import { DrawerTitle, ActionDrawerGeneral, DrawerSubContent } from '../../StrategyPage/Drawer/styled';
import FundTable from './FundTable';
import { DrawerProductWrapper, FundBlock, FundTabContent, HorizontalScrollable } from '../styled';
import CustomSearch from './CustomSearch';

export interface Product {
  id?: number;
  description: string;
  value: number | string;
  links?: Product[];
}

interface DrawerProductProps {
  isOpen: boolean;
  close: () => void;
  product?: any;
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
    const { product } = this.props;
    if (product && product.links && product.links.length > 0) {
      return this.renderLinkedDrawer();
    }

    return this.renderNewDrawer();
  }

  public renderFundTab = () => {
    const { product } = this.props;

    return (
      <>
        <FundTabContent>
          <FundBlock>
            <CustomSearch placeholder="Search Product" />
            <CustomSearch placeholder="Search Proposed Fund" />
          </FundBlock>
          <HorizontalScrollable>
            {map(product.links, (linkedProduct: Product) => (
              <FundBlock key={linkedProduct.id}>
                <CustomSearch placeholder="Search Product" />
                <CustomSearch placeholder="Search Proposed Fund" />
              </FundBlock>
            ))}
          </HorizontalScrollable>
        </FundTabContent>

        <ActionDrawerGeneral visible>
          <Button htmlType={'button'} type={'default'}>
            <span>Add comparison product</span>
          </Button>
          <Button htmlType={'submit'} type={'primary'}>
            <span>Save</span>
          </Button>
        </ActionDrawerGeneral>
      </>
    );
  }

  // tslint:disable-next-line:no-empty
  public renderLinkedDrawer = () => {
    return (
      <DrawerProductWrapper>
        <DrawerTitle>Title</DrawerTitle>
        <DrawerSubContent>
          Detail text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </DrawerSubContent>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Fund" key="1">
            {this.renderFundTab()}
          </TabPane>
          <TabPane tab="Assets Allocation" key="2">
            Coming soon
          </TabPane>
        </Tabs>
      </DrawerProductWrapper>
    );
  }

  public renderNewDrawer = () => {
    return (
      <DrawerProductWrapper>
        <DrawerTitle>My Product</DrawerTitle>
        <ActionDrawerGeneral drawer>
          <CustomSearch placeholder="Search Product" />
          <CustomSearch placeholder="Search Fund" />
        </ActionDrawerGeneral>

        <FundTable columns={this.columns} data={data} />

        <ActionDrawerGeneral visible>
          <Button htmlType={'submit'} type={'primary'}>
            <span>Save</span>
          </Button>
        </ActionDrawerGeneral>
      </DrawerProductWrapper>
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

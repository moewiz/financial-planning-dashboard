import React from 'react';
import { Tabs } from 'antd';

import { StrategyEntry } from '../../../reducers/client';
import { StrategyPageWrapper } from '../../../components/StrategyPage/styled';
import { CurrentProduct, ProposedProduct } from '../../../containers/productOptimizer';
import { TabPanStyled } from './styled';
import DrawerProduct from '../../../components/ProductOptimizer/Drawer/DrawerProduct';

export interface ProductProps {
  openDrawer: () => void;
}

interface ProductOptimizerProps {
  clientId: number;

  pageData: StrategyEntry;
}

const ProductOptimizer = (props: ProductOptimizerProps) => {
  const [isOpen, setDrawerVisible] = React.useState<boolean>(false);
  const openDrawer = () => {
    setDrawerVisible(true);
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <StrategyPageWrapper>
      <Tabs defaultActiveKey="1">
        <TabPanStyled tab="Client" key="1">
          <CurrentProduct openDrawer={openDrawer} />
          <ProposedProduct openDrawer={openDrawer} />
        </TabPanStyled>
        <TabPanStyled tab="Partner" key="2">
          <CurrentProduct openDrawer={openDrawer} />
          <ProposedProduct openDrawer={openDrawer} />
        </TabPanStyled>
      </Tabs>
      <DrawerProduct isOpen={isOpen} close={closeDrawer} />
    </StrategyPageWrapper>
  );
};

export default ProductOptimizer;

import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

import { StrategyEntry } from '../../../reducers/client';
import { StrategyPageWrapper } from '../../../components/StrategyPage/styled';
import { CurrentProduct, ProposedProduct } from '../../../containers/productOptimizer';
import { TabPanStyled } from './styled';

interface ProductOptimizerProps {
  clientId: number;

  pageData: StrategyEntry;
}

const ProductOptimizer = (props: ProductOptimizerProps) => {
  return (
    <StrategyPageWrapper>
      <Tabs defaultActiveKey="1">
        <TabPanStyled tab="Client" key="1">
          <CurrentProduct />
          <ProposedProduct />
        </TabPanStyled>
        <TabPanStyled tab="Partner" key="2">
          <CurrentProduct />
          <ProposedProduct />
        </TabPanStyled>
      </Tabs>
    </StrategyPageWrapper>
  );
};

export default ProductOptimizer;

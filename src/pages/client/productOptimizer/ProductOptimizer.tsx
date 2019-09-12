import React from 'react';
import { Tabs, Button } from 'antd';
import { Form, Formik, FormikProps } from 'formik';

import { ProductOptimizerPage } from '../../../reducers/client';
import { StrategyPageWrapper } from '../../../components/StrategyPage/styled';
import { CurrentProduct, ProposedProduct } from '../../../containers/productOptimizer';
import { TabPanStyled } from './styled';
import DrawerProduct from '../../../components/ProductOptimizer/Drawer/DrawerProduct';
import { ActionDrawerGeneral } from '../../../components/StrategyPage/Drawer/styled';

export interface ProductProps {
  openDrawer: (record?: any) => void;
}

interface ProductOptimizerProps {
  clientId: number;

  pageData: ProductOptimizerPage;
}

const dummyData = {
  current: [
    {
      id: 1,
      description: 'Product A',
      value: 10000,
    },
    {
      id: 2,
      description: 'Product B',
      value: 10000,
    },
    {
      id: 3,
      description: 'Product C',
      value: 10000,
    },
  ],
  proposed: [
    {
      id: 1,
      description: 'New proposed 1',
      value: '10,000',
    },
    {
      id: 2,
      description: 'Proposed 2',
      value: '10,000',
      links: [
        {
          id: 1,
          description: 'Product C',
          value: '10,000',
        },
      ],
    },
  ],
};

const ProductOptimizer = (props: ProductOptimizerProps) => {
  const [isOpen, setDrawerVisible] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<any>(undefined);
  const openDrawer = (record?: any) => {
    setDrawerVisible(true);
    setProduct(record);
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <StrategyPageWrapper>
      <Formik
        onSubmit={(values: ProductOptimizerPage, actions) => {
          console.log('submitted', values);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 300);
        }}
        initialValues={{
          client: dummyData,
          partner: dummyData,
        }}
        render={(formikProps: FormikProps<ProductOptimizerPage>) => {
          return (
            <Form>
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
              <ActionDrawerGeneral visible>
                <Button htmlType={'button'} type={'default'} disabled={formikProps.isSubmitting || !formikProps.dirty}>
                  <span>Discard</span>
                </Button>
                <Button htmlType={'submit'} type={'primary'} disabled={formikProps.isSubmitting || !formikProps.dirty}>
                  <span>Save</span>
                </Button>
              </ActionDrawerGeneral>
            </Form>
          );
        }}
      />
      <DrawerProduct isOpen={isOpen} close={closeDrawer} product={product} />
    </StrategyPageWrapper>
  );
};

export default ProductOptimizer;

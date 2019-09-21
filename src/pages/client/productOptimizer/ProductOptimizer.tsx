import React from 'react';
import { Tabs, Button } from 'antd';
import { Form, Formik, FormikProps, FieldArray, FieldArrayRenderProps } from 'formik';
import { get } from 'lodash';

import { ProductOptimizerPage } from '../../../reducers/client';
import { StrategyPageWrapper } from '../../../components/StrategyPage/styled';
import { CurrentProduct, ProposedProduct } from '../../../containers/productOptimizer';
import DrawerProduct, { Product } from '../../../components/ProductOptimizer/Drawer/DrawerProduct';
import { ActionDrawerGeneral } from '../../../components/StrategyPage/Drawer/styled';
import { TabPanStyled } from './styled';

export interface ProductTable {
  dataList: Product[];
  openDrawer: (record?: any) => void;
  fieldArrayRenderProps: FieldArrayRenderProps;
}

interface ProductOptimizerProps {
  clientId: number;

  pageData: ProductOptimizerPage;
}

interface ProductOptimizerStates {
  isOpen: boolean;
  product?: Product;
}

const client = {
  current: [
    {
      id: 1,
      description: 'Product A',
      value: 10000,
      details: {
        product: {
          id: 2,
          name: 'Product X',
        },
        funds: [
          {
            id: 1,
            name: 'Fund A',
            value: 20000,
          },
          {
            id: 2,
            name: 'Fund B',
            value: 50000,
          },
          {
            id: 3,
            name: 'Fund C',
            value: 30000,
          },
        ],
      },
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
    { description: '', value: '' },
  ],
  proposed: [
    {
      id: 4,
      description: 'New proposed 1',
      value: 10000,
    },
    {
      id: 5,
      description: 'New proposed 2',
      value: 10000,
      details: {
        product: {
          id: 101,
          name: 'Product X',
          value: 100,
        },
        funds: [
          {
            id: 101,
            name: 'Sunsuper Balanced',
            value: 10000,
          },
          {
            id: 102,
            name: 'Sunsuper Conservative',
            value: 10000,
          },
          {
            id: 103,
            name: 'Sunsuper Conservative',
            value: 10000,
          },
        ],
      },
    },
    {
      id: 6,
      description: 'Proposed 1',
      value: 10000,
      details: {
        product: {
          id: 101,
          name: 'Product X',
          value: 100,
        },
        funds: [
          {
            id: 101,
            name: 'Sunsuper Balanced',
            value: 10000,
          },
          {
            id: 102,
            name: 'Sunsuper Conservative',
            value: 10000,
          },
          {
            id: 103,
            name: 'Sunsuper Conservative',
            value: 10000,
          },
        ],
      },
      links: [
        {
          id: 1,
          description: 'Product A',
          value: 10000,
          details: {
            product: {
              id: 101,
              name: 'Product H',
              value: 100,
            },
            funds: [
              {
                id: 123,
                name: 'Fund DE',
                value: 10000,
              },
            ],
          },
        },
        {
          id: 2,
          description: 'Product B',
          value: 1000,
          alternative: true,
          details: {
            product: {
              id: 101,
              name: 'Product I',
              value: 100,
            },
            funds: [
              {
                id: 123,
                name: 'Fund DF',
                value: 10000,
              },
            ],
          },
        },
      ],
    },
    {
      id: 7,
      description: 'Proposed 2',
      value: 10000,
      links: [
        {
          id: 1,
          description: 'Product A',
          value: 10000,
          details: {
            product: {
              id: 101,
              name: 'Product H',
              value: 100,
            },
            funds: [
              {
                id: 123,
                name: 'Fund DE',
                value: 10000,
              },
            ],
          },
        },
      ],
    },
    { description: '', value: '' },
  ],
};

const partner = {
  current: [
    {
      id: 6,
      description: 'Product A',
      value: 10000,
    },
    {
      id: 7,
      description: 'Product B',
      value: 10000,
    },
    {
      id: 8,
      description: 'Product C',
      value: 10000,
    },
    { description: '', value: '' },
  ],
  proposed: [
    {
      id: 9,
      description: 'New proposed 1',
      value: 10000,
    },
    {
      id: 10,
      description: 'Proposed 2',
      value: 10000,
      links: [
        {
          id: 8,
          description: 'Product C',
          value: 10000,
        },
      ],
    },
    { description: '', value: '' },
  ],
};

const dummyProductOptimizerData = {
  client,
  partner,
};

class ProductOptimizer extends React.PureComponent<ProductOptimizerProps, ProductOptimizerStates> {
  constructor(props: ProductOptimizerProps) {
    super(props);
    this.state = {
      isOpen: false,
      product: undefined,
    };
  }

  public setDrawerVisible = (isOpen: boolean) => this.setState({ isOpen });

  public setProduct = (product?: Product) => this.setState({ product });

  public openDrawer = (record?: any) => {
    this.setDrawerVisible(true);
    this.setProduct(record);
  }

  public closeDrawer = () => {
    this.setDrawerVisible(false);
  }

  public resetForm = (formikProps: FormikProps<ProductOptimizerPage>) => () => {
    formikProps.resetForm();
  }

  public render() {
    const { isOpen, product } = this.state;

    return (
      <StrategyPageWrapper>
        <Formik
          onSubmit={(values: ProductOptimizerPage, actions) => {
            console.log('submitted', values);
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 300);
          }}
          initialValues={dummyProductOptimizerData}
          render={(formikProps: FormikProps<ProductOptimizerPage>) => {
            return (
              <Form>
                <Tabs defaultActiveKey="1">
                  <TabPanStyled tab="Client" key="1">
                    <FieldArray
                      name="client.current"
                      validateOnChange={false}
                      render={(fieldArrayRenderProps: FieldArrayRenderProps) => {
                        return (
                          <CurrentProduct
                            openDrawer={this.openDrawer}
                            dataList={get(formikProps, 'values.client.current', [])}
                            fieldArrayRenderProps={fieldArrayRenderProps}
                          />
                        );
                      }}
                    />
                    <FieldArray
                      name="client.proposed"
                      validateOnChange={false}
                      render={(fieldArrayRenderProps: FieldArrayRenderProps) => {
                        return (
                          <ProposedProduct
                            openDrawer={this.openDrawer}
                            dataList={get(formikProps, 'values.client.proposed', [])}
                            fieldArrayRenderProps={fieldArrayRenderProps}
                          />
                        );
                      }}
                    />
                  </TabPanStyled>
                  <TabPanStyled tab="Partner" key="2">
                    <FieldArray
                      name="partner.current"
                      validateOnChange={false}
                      render={(fieldArrayRenderProps: FieldArrayRenderProps) => {
                        return (
                          <CurrentProduct
                            openDrawer={this.openDrawer}
                            dataList={get(formikProps, 'values.partner.current', [])}
                            fieldArrayRenderProps={fieldArrayRenderProps}
                          />
                        );
                      }}
                    />
                    <FieldArray
                      name="partner.proposed"
                      validateOnChange={false}
                      render={(fieldArrayRenderProps: FieldArrayRenderProps) => {
                        return (
                          <ProposedProduct
                            openDrawer={this.openDrawer}
                            dataList={get(formikProps, 'values.partner.proposed', [])}
                            fieldArrayRenderProps={fieldArrayRenderProps}
                          />
                        );
                      }}
                    />
                  </TabPanStyled>
                </Tabs>
                <ActionDrawerGeneral visible>
                  <Button
                    htmlType={'button'}
                    type={'default'}
                    disabled={formikProps.isSubmitting || !formikProps.dirty}
                    onClick={this.resetForm(formikProps)}
                  >
                    <span>Discard</span>
                  </Button>
                  <Button
                    htmlType={'submit'}
                    type={'primary'}
                    disabled={formikProps.isSubmitting || !formikProps.dirty}
                  >
                    <span>Save</span>
                  </Button>
                </ActionDrawerGeneral>
              </Form>
            );
          }}
        />
        <DrawerProduct isOpen={isOpen} close={this.closeDrawer} product={product} />
      </StrategyPageWrapper>
    );
  }
}

export default ProductOptimizer;

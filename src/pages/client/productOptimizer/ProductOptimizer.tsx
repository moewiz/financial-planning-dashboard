import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { Form, Formik, FormikProps, FieldArray, FieldArrayRenderProps } from 'formik';
import { get, reduce } from 'lodash';

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
  loading: boolean;
  clientId: number;

  pageData: ProductOptimizerPage;
}

interface ProductOptimizerStates {
  isOpen: boolean;
  product?: Product;
}

interface FormData {
  [p: string]: {};
}

const addPlaceholder = (list: ProductOptimizerPage): FormData => {
  return Object.entries(list).reduce(
    (acc, [key, values]) => ({
      ...acc,
      [key]: Object.entries(values).reduce((temp, value: any[]) => {
        const [k, v] = value;
        return { ...temp, [k]: [...v, { description: '', value: '' }] };
      }, {}),
    }),
    {},
  );
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

  public resetForm = (formikProps: FormikProps<FormData>) => () => {
    formikProps.resetForm();
  }

  public render() {
    const { isOpen, product } = this.state;
    const { loading, pageData } = this.props;

    return (
      <StrategyPageWrapper>
        {loading ? (
          <Spin />
        ) : (
          <Formik
            onSubmit={(values: FormData, actions) => {
              console.log('submitted', values);
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 300);
            }}
            initialValues={addPlaceholder(pageData)}
            render={(formikProps: FormikProps<FormData>) => {
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
        )}
        <DrawerProduct isOpen={isOpen} close={this.closeDrawer} product={product} />
      </StrategyPageWrapper>
    );
  }
}

export default ProductOptimizer;

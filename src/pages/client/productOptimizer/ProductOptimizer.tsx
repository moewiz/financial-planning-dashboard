import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Tabs, Button, Spin } from 'antd';
import { Form, Formik, FormikProps, FieldArray, FieldArrayRenderProps } from 'formik';
import { get, map } from 'lodash';

import { ProductOptimizerPage } from '../../../reducers/client';
import { StrategyPageWrapper } from '../../../components/StrategyPage/styled';
import { CurrentProduct, ProposedProduct } from '../../../containers/productOptimizer';
import DrawerProduct, { Product } from '../../../components/ProductOptimizer/Drawer/DrawerProduct';
import { ActionDrawerGeneral } from '../../../components/StrategyPage/Drawer/styled';
import { TabPanStyled } from './styled';

export const ItemTypes = {
  ROW: 'row',
};

export interface ProductTable {
  dataList: Product[];
  openDrawer: (record?: any) => void;
  fieldArrayRenderProps?: FieldArrayRenderProps;
  client?: {
    id: number;
    name: string;
  };
}

interface ProductOptimizerProps {
  loading: boolean;
  clientId: number;
  client?: {
    clientId: number;
    clientName: string;
  };

  pageData: ProductOptimizerPage;
  readOnly?: boolean;
}

interface ProductOptimizerStates {
  isOpen: boolean;
  product?: Product;
}

interface FormData {
  [p: string]: any;
}

const addPlaceholder = (list: ProductOptimizerPage): FormData =>
  Object.entries(list).reduce(
    (acc, [key, values]) => ({
      ...acc,
      [key]: Object.entries(values).reduce((temp, value: any[]) => {
        const [k, v] = value;

        if (k === 'current' || k === 'proposed') {
          return {
            ...temp,
            [k]: [...map(v, (p, i: number) => ({ ...p, key: i })), { key: v.length, description: '', value: '' }],
          };
        }

        return {
          ...temp,
          [k]: v,
        };
      }, {}),
    }),
    {},
  );

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
    const formData = addPlaceholder(pageData);

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
            initialValues={formData}
            render={(formikProps: FormikProps<FormData>) => {
              const { values } = formikProps;

              return (
                <Form>
                  <Tabs defaultActiveKey="1">
                    <TabPanStyled tab="Client" key="1">
                      <DndProvider backend={HTML5Backend}>
                        <FieldArray
                          name="client.current"
                          validateOnChange={false}
                          render={(fieldArrayRenderProps: FieldArrayRenderProps) => {
                            return (
                              <CurrentProduct
                                openDrawer={this.openDrawer}
                                dataList={get(formikProps, 'values.client.current', [])}
                                fieldArrayRenderProps={fieldArrayRenderProps}
                                client={values.client}
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
                                tabKey="client"
                                client={values.client}
                              />
                            );
                          }}
                        />
                      </DndProvider>
                    </TabPanStyled>
                    {values.partner && (
                      <TabPanStyled tab="Partner" key="2">
                        <DndProvider backend={HTML5Backend}>
                          <FieldArray
                            name="partner.current"
                            validateOnChange={false}
                            render={(fieldArrayRenderProps: FieldArrayRenderProps) => {
                              return (
                                <CurrentProduct
                                  openDrawer={this.openDrawer}
                                  dataList={get(formikProps, 'values.partner.current', [])}
                                  fieldArrayRenderProps={fieldArrayRenderProps}
                                  client={values.partner}
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
                                  tabKey="partner"
                                  client={values.partner}
                                />
                              );
                            }}
                          />
                        </DndProvider>
                      </TabPanStyled>
                    )}
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

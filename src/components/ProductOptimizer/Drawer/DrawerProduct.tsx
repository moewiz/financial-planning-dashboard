import React, { PureComponent } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { get } from 'lodash';
import { Button, Drawer, Tabs } from 'antd';
const { TabPane } = Tabs;

import { DrawerTitle, ActionDrawerGeneral, DrawerSubContent } from '../../StrategyPage/Drawer/styled';
import { DrawerProductWrapper } from '../styled';
import LinkProductAndFund from './LinkProductAndFund';
import FundTab from './FundTab';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';
import uuidv1 from 'uuid/v1';

export interface Option {
  id?: number;
  name: string;
  code?: string;
  value?: number;
}

export interface Product {
  id?: number;
  description: string;
  value: number | string;
  links?: Product[];
  alternative?: boolean;
  details?: {
    product: Option;
    funds: Option[];
  };
}

interface DrawerProductProps {
  isOpen: boolean;
  close: () => void;
  product?: Product;
}

const alternativeProduct: Product = {
  id: 99,
  description: 'RoP - alternative',
  value: 100,
  details: {
    product: {
      id: 100,
      name: 'Product G',
      value: 100,
    },
    funds: [
      {
        id: 100,
        name: 'Sunsuper Balanced',
        value: 10000,
      },
    ],
  },
};

class DrawerProduct extends PureComponent<DrawerProductProps> {
  public columns = [
    {
      title: 'Fund Name',
      dataIndex: 'name',
      key: '0',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '1',
      className: 'text-align-center',
      editable: true,
      type: EditCellType.number,
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      className: 'text-align-center',
      editable: true,
      type: EditCellType.number,
      options: {
        min: 0,
        max: 100,
        formatter: (value: any) => `${value}%`,
        parser: (value: any) => value.replace('%', ''),
      },
      key: '2',
    },
  ];

  public renderDrawer = () => {
    const { product } = this.props;
    if (product && product.links && product.links.length > 0) {
      return this.renderLinkedProducts();
    }

    return this.renderSingleProduct();
  }

  public renderFundTab = () => {
    const { product } = this.props;
    if (!product) {
      return null;
    }

    return (
      <Formik
        onSubmit={(values: Product, actions) => {
          console.log('submitted', values);
          setTimeout(() => {
            actions.setSubmitting(false);
            console.log('close drawer');
          }, 500);
        }}
        initialValues={{
          ...product,
          links: product.links && product.links.length === 1 ? [...product.links, alternativeProduct] : product.links,
        }}
        render={(formikProps: FormikProps<Product>) => {
          const { values } = formikProps;

          return (
            <Form>
              <FundTab
                product={values}
                setFieldValue={formikProps.setFieldValue}
                isSubmitting={formikProps.isSubmitting}
                dirty={formikProps.dirty}
              />
            </Form>
          );
        }}
      />
    );
  }

  public renderLinkedProducts = () => {
    const { product } = this.props;

    return (
      <DrawerProductWrapper>
        <DrawerTitle>{get(product, 'description', 'Title')}</DrawerTitle>
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

  public onEdit = (value: any, name: string, rowIndex: number) => {
    console.log({ value, name, rowIndex });
    // const { fieldArrayRenderProps, dataList } = this.props;
    // const rowName = `${fieldArrayRenderProps.name}[${rowIndex}]`;
    // const fieldName = `${rowName}.${name}`;
    // fieldArrayRenderProps.form.setFieldValue(fieldName, value);
    //
    // const record = dataList[rowIndex];
    // const remainingFieldName = name === 'description' ? 'value' : 'description';
    // if (record && !record.id && value && record[remainingFieldName]) {
    //   const id = uuidv1();
    //   fieldArrayRenderProps.form.setFieldValue(`${rowName}.id`, id);
    //   setTimeout(() => {
    //     this.handleAdd();
    //   }, 10);
    // }
  }

  public getColumns = () => {
    return this.columns.map((col) => {
      if (col.editable) {
        return {
          ...col,
          onCell: (record: any, rowIndex: number) => ({
            ...col,
            record,
            rowIndex,
            // dataIndex: 'test-' + rowIndex + col.dataIndex,
            type: col.type || 'text',
            onEdit: this.onEdit,
          }),
        };
      }

      return col;
    });
  }

  public renderSingleProduct = () => {
    const { product } = this.props;

    return product ? (
      <Formik
        onSubmit={(values: Product, actions) => {
          console.log('submitted', values);
          setTimeout(() => {
            actions.setSubmitting(false);
            console.log('close drawer');
          }, 500);
        }}
        initialValues={product}
        render={(formikProps: FormikProps<Product>) => {
          const { values } = formikProps;
          const { details } = values;

          return (
            <Form>
              <DrawerProductWrapper>
                <DrawerTitle>{get(details, 'product.name', 'My Product')}</DrawerTitle>

                <LinkProductAndFund
                  columns={this.getColumns()}
                  values={values}
                  setFieldValue={formikProps.setFieldValue}
                />

                <ActionDrawerGeneral visible>
                  <Button
                    htmlType={'submit'}
                    type={'primary'}
                    disabled={formikProps.isSubmitting || !formikProps.dirty}
                  >
                    <span>Save</span>
                  </Button>
                </ActionDrawerGeneral>
              </DrawerProductWrapper>
            </Form>
          );
        }}
      />
    ) : null;
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

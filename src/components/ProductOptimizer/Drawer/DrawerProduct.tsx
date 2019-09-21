import React, { PureComponent } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { get, map } from 'lodash';
import { Drawer, Tabs } from 'antd';
const { TabPane } = Tabs;

import { DrawerTitle, DrawerSubContent } from '../../StrategyPage/Drawer/styled';
import { DrawerProductWrapper } from '../styled';
import FundTab from './FundTab';
import SingleProduct from './SingleProduct';

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

export const getSumFunds = (funds: Option[]) =>
  funds.reduce((acc: number, data: Option) => (acc += data.value ? data.value : 0), 0);

export const addPercentage = (funds: Option[]) => {
  const sum = getSumFunds(funds);

  return map(funds, (data: Option) => {
    let value = 0;
    if (data && data.value) {
      value = data.value;
    }
    return { ...data, percentage: ((value / sum) * 100).toFixed() };
  });
};

const initFormValues = (value: Product) => {
  const product = { ...value };
  if (product.links && product.links.length > 0) {
    const links = product.links.length === 1 ? [...product.links, alternativeProduct] : product.links;
    product.links = map(links, (link: Product) => initFormValues(link));
  }

  if (product.details && product.details.funds) {
    const funds = addPercentage(product.details.funds);
    const sum = getSumFunds(funds);
    funds.push({ id: -1, name: 'Total', value: sum, percentage: '100' });

    product.details = {
      product: product.details.product,
      funds,
    };
  }

  return product;
};

class DrawerProduct extends PureComponent<DrawerProductProps> {
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
        initialValues={initFormValues(product)}
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

  public renderSingleProduct = () => {
    const { product } = this.props;

    if (product) {
      return (
        <Formik
          onSubmit={(values: Product, actions) => {
            console.log('submitted', values);
            setTimeout(() => {
              actions.setSubmitting(false);
              console.log('close drawer');
            }, 500);
          }}
          initialValues={initFormValues(product)}
          render={(formikProps: FormikProps<Product>) => (
            <Form>
              <SingleProduct
                values={formikProps.values}
                setFieldValue={formikProps.setFieldValue}
                dirty={formikProps.dirty}
                isSubmitting={formikProps.isSubmitting}
              />
            </Form>
          )}
        />
      );
    }

    return null;
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

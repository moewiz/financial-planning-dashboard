import React, { PureComponent } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import { map, get } from 'lodash';
import { Button, Drawer, Tabs } from 'antd';
const { TabPane } = Tabs;

import { DrawerTitle, ActionDrawerGeneral, DrawerSubContent } from '../../StrategyPage/Drawer/styled';
import FundTable from './FundTable';
import { DrawerProductWrapper, FundBlock, FundTabContent, HorizontalScrollable } from '../styled';
import CustomSearch from './CustomSearch';

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

interface DrawerProductStates {
  hovering?: number;
}

const data = [
  {
    name: 'Fund DF',
    value: '10,000',
    percentage: '100%',
  },
];

class DrawerProduct extends PureComponent<DrawerProductProps, DrawerProductStates> {
  public state = { hovering: -1 };
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
      return this.renderLinkedProducts();
    }

    return this.renderSingleProduct();
  }

  public mouseOver = (id?: number) => {
    this.setState({
      hovering: id,
    });
  }

  public mouseOut = (id?: number) => {
    this.setState({
      hovering: -1,
    });
  }

  public renderFundTab = () => {
    const { product } = this.props;
    const { hovering } = this.state;
    const haveHover = hovering !== -1;
    const getClasses = (id?: number) => {
      const classname = 'all-proposed';
      if (haveHover) {
        return hovering === id ? 'proposed-active' : 'proposed-inavtive';
      } else {
        return classname;
      }
    };

    return (
      <>
        <FundTabContent>
          <FundBlock
            className={getClasses(-2)}
            onMouseOver={() => {
              this.mouseOver(-2);
            }}
            onMouseOut={() => {
              this.mouseOut(-2);
            }}
          >
            <CustomSearch placeholder="Add Product" />
            <CustomSearch placeholder="Search Proposed Fund" type="fund" />
          </FundBlock>
          <HorizontalScrollable>
            {product &&
              map(product.links, (linkedProduct: Product) => (
                <FundBlock
                  className={getClasses(linkedProduct.id)}
                  key={linkedProduct.id}
                  onMouseOver={() => {
                    this.mouseOver(linkedProduct.id);
                  }}
                  onMouseOut={() => {
                    this.mouseOut(linkedProduct.id);
                  }}
                >
                  <CustomSearch placeholder="Add Product" />
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

  public renderLinkedProducts = () => {
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

                <FundTable columns={this.columns} values={values} setFieldValue={formikProps.setFieldValue} />

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

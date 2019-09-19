import React from 'react';
import { map } from 'lodash';
import { Button } from 'antd';

import { Product } from './DrawerProduct';
import { FundBlock, FundTabContent, HorizontalScrollable } from '../styled';
import FundTable from './FundTable';
import { ActionDrawerGeneral } from '../../StrategyPage/Drawer/styled';

interface FundTabProps {
  product: Product;
  setFieldValue: (field: string, value: any) => void;
  isSubmitting: boolean;
  dirty: boolean;
}

interface FundTabStates {
  hovering?: number;
}

class FundTab extends React.PureComponent<FundTabProps, FundTabStates> {
  public state = {
    hovering: -1,
  };
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
      width: 100,
    },
    {
      title: '%',
      dataIndex: 'percentage',
      type: 'number',
      key: '2',
      width: 60,
    },
    {
      title: '',
      dataIndex: 'remove',
      width: 30,
    },
  ];

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

  public handleMouseOver = (id?: number) => () => {
    this.mouseOver(id);
  }

  public handleMouseOut = (id?: number) => () => {
    this.mouseOut(id);
  }

  public getClasses = (id?: number) => {
    const { hovering } = this.state;
    const haveHover = hovering !== -1;
    const classname = 'all-proposed';
    if (haveHover) {
      return hovering === id ? 'proposed-active' : 'proposed-inavtive';
    } else {
      return classname;
    }
  }

  public render() {
    const { product, setFieldValue, isSubmitting, dirty } = this.props;

    return (
      <>
        <FundTabContent>
          <FundBlock
            className={this.getClasses(-2)}
            onMouseOver={this.handleMouseOver(-2)}
            onMouseOut={this.handleMouseOut(-2)}
          >
            <FundTable columns={this.columns} values={product} setFieldValue={setFieldValue} linkedProduct={true} />
          </FundBlock>
          <HorizontalScrollable>
            {product &&
              map(product.links, (linkedProduct: Product, index: number) => {
                return (
                  <FundBlock
                    className={this.getClasses(linkedProduct.id)}
                    key={linkedProduct.id}
                    // onMouseOver={this.handleMouseOver(linkedProduct.id)}
                    // onMouseOut={this.handleMouseOut(linkedProduct.id)}
                  >
                    <FundTable
                      columns={this.columns}
                      values={linkedProduct}
                      setFieldValue={setFieldValue}
                      parentField={`links.${index}`}
                      linkedProduct={true}
                    />
                  </FundBlock>
                );
              })}
          </HorizontalScrollable>
        </FundTabContent>

        <ActionDrawerGeneral visible>
          <Button htmlType={'button'} type={'default'}>
            <span>Add comparison product</span>
          </Button>
          <Button htmlType={'submit'} type={'primary'} disabled={isSubmitting || !dirty}>
            <span>Save</span>
          </Button>
        </ActionDrawerGeneral>
      </>
    );
  }
}

export default FundTab;

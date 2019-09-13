import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import cn from 'classnames';

import { TableEntryContainer } from '../../pages/client/styled';
import { Projections } from '../../components/Icons';
import NewProposedProduct from '../../components/ProductOptimizer/NewProposedProduct';
import { ProductTable } from '../../pages/client/productOptimizer/ProductOptimizer';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';

interface ProposedProductState {
  loading: boolean;
}

const currentProductsTree = [
  {
    description: 'Super',
    children: [
      {
        description: 'Product A',
        value: 10000,
        id: 1,
      },
      {
        description: 'Product B',
        value: 10000,
        id: 2,
      },
      {
        description: 'Product C',
        value: 10000,
        id: 3,
      },
    ],
  },
  {
    description: 'Test',
    children: [
      {
        description: 'Product D',
        value: 5000,
        id: 4,
      },
      {
        description: 'Product E',
        value: 5000,
        id: 5,
      },
      {
        description: 'Product F',
        value: 5000,
        id: 6,
      },
    ],
  },
];

class ProposedProduct extends PureComponent<ProductTable, ProposedProductState> {
  public state = {
    loading: false,
  };
  public columns = [
    {
      title: '',
      key: 'link',
      className: 'text-align-center',
      render: (text: any, record: any) => <Icon type="link" style={{ transform: 'rotate(45deg)' }} />,
      width: 30,
    },
    {
      title: 'Product',
      dataIndex: 'description',
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
      title: '',
      key: 'operation',
      render: (text: any, record: any, index: number) => {
        const isDisable = !record || !record.id;
        return (
          <>
            <Icon
              className={cn('projection', { disabled: isDisable })}
              component={Projections}
              onClick={() => !isDisable && this.openDrawer(record)}
            />
            {isDisable ? (
              <Icon className={'remove disabled'} type="close-square" />
            ) : (
              <Popconfirm title="Really delete?" onConfirm={() => this.onRemove(record, index)}>
                <Icon className="remove" type="close-square" />
              </Popconfirm>
            )}
          </>
        );
      },
      width: 60,
    },
  ];
  private tableName = 'proposed-product';

  public openDrawer = (record: any) => {
    const { openDrawer } = this.props;
    openDrawer(record);
  }

  public onAdd = (productIds: number[]) => {
    if (productIds && productIds.length > 0) {
      let products: any[] = [];
      currentProductsTree.map((parent) => {
        if (parent.children && parent.children.length > 0) {
          products = [...products, ...parent.children.filter((product) => productIds.includes(product.id))];
        }
      });
      const { fieldArrayRenderProps, dataList } = this.props;
      let lastIndex = dataList.length - 1;
      products.map((product) => {
        fieldArrayRenderProps.insert(lastIndex, product);
        lastIndex += 1;
      });
    }
  }

  public onRemove = (record: any, index: number) => {
    if (record && record.id) {
      const { fieldArrayRenderProps } = this.props;
      fieldArrayRenderProps.remove(index);
    }
  }

  public render() {
    const { dataList } = this.props;

    return (
      <TableEntryContainer>
        <NewProposedProduct onAdd={this.onAdd} data={currentProductsTree} />
        <Table
          rowKey={(rowKey) => (rowKey.id ? rowKey.id.toString() : 'new')}
          className={`table-general ${this.tableName}-table`}
          columns={this.columns}
          dataSource={dataList}
          pagination={false}
        />
      </TableEntryContainer>
    );
  }
}

export default ProposedProduct;

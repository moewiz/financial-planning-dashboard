import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import cn from 'classnames';

import { TableEntryContainer } from '../../pages/client/styled';
import { Projections } from '../../components/Icons';
import NewProposedProduct from '../../components/ProductOptimizer/NewProposedProduct';
import { ProductProps } from '../../pages/client/productOptimizer/ProductOptimizer';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';

interface ProposedProductState {
  loading: boolean;
  dataList: Product[];
}

class ProposedProduct extends PureComponent<ProductProps, ProposedProductState> {
  public state = {
    loading: false,
    dataList: [
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
      render: (text: any, record: any) => {
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
              <Popconfirm title="Really delete?" onConfirm={() => this.onRemove(record)}>
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

  public onAdd = (product: any) => {
    this.setState(({ dataList: dataList }) => ({ dataList: [...dataList, { description: '', value: '' }] }));
  }

  public onRemove = (record: any) => {
    if (record && record.id) {
      this.setState(({ dataList }) => ({ dataList: dataList.filter(({ id }) => id !== record.id) }));
    }
  }

  public render() {
    const { dataList } = this.state;

    return (
      <TableEntryContainer>
        <NewProposedProduct onAdd={this.onAdd} />
        <Table
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

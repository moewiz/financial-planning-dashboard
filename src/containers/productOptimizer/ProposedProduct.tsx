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

  public onAdd = (product: any) => {
    const { fieldArrayRenderProps } = this.props;
    fieldArrayRenderProps.push({ description: '', value: '' });
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
        <NewProposedProduct onAdd={this.onAdd} />
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

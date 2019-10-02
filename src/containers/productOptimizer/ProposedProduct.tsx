import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import cn from 'classnames';
import uuidv1 from 'uuid/v1';

import { TableEntryContainer } from '../../pages/client/styled';
import { Projections } from '../../components/Icons';
import NewProposedProduct from '../../components/ProductOptimizer/NewProposedProduct';
import { ProductTable } from '../../pages/client/productOptimizer/ProductOptimizer';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';
import { components } from './CurrentProduct';
import { EditCellType } from '../../components/StrategyPage/Drawer/EditCell';

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
        id: 100,
      },
      {
        description: 'Product B',
        value: 10000,
        id: 101,
      },
      {
        description: 'Product C',
        value: 10000,
        id: 1003,
      },
    ],
  },
  {
    description: 'Test',
    children: [
      {
        description: 'Product D',
        value: 5000,
        id: 1004,
      },
      {
        description: 'Product E',
        value: 5000,
        id: 1005,
      },
      {
        description: 'Product F',
        value: 5000,
        id: 1006,
      },
    ],
  },
];

class ProposedProduct extends PureComponent<ProductTable, ProposedProductState> {
  public state = {
    loading: false,
  };

  private columns = [
    {
      title: '',
      key: 'links',
      className: 'text-align-center',
      dataIndex: 'links',
      editable: true,
      type: EditCellType.linkCurrentProduct,
      options: {
        data: currentProductsTree,
      },
      width: 30,
    },
    {
      title: 'Product',
      dataIndex: 'description',
      options: {
        placeholder: 'Enter Description',
      },
      type: EditCellType.text,
      key: '0',
      editable: true,
      showLinks: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      options: {
        placeholder: 'Enter Value',
        allowEmpty: true,
      },
      type: EditCellType.number,
      key: '1',
      editable: true,
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

  public handleAdd: (row?: Product) => void = (row = { description: '', value: '' }) => {
    const { fieldArrayRenderProps } = this.props;
    fieldArrayRenderProps.push(row);
  }

  public onEdit = (value: any, name: string, rowIndex: number) => {
    const { fieldArrayRenderProps, dataList } = this.props;
    const rowName = `${fieldArrayRenderProps.name}[${rowIndex}]`;
    const fieldName = `${rowName}.${name}`;
    fieldArrayRenderProps.form.setFieldValue(fieldName, value);

    const record = dataList[rowIndex];
    const remainingFieldName = name === 'description' ? 'value' : 'description';
    if (record && !record.id && value && record[remainingFieldName]) {
      const id = uuidv1();
      fieldArrayRenderProps.form.setFieldValue(`${rowName}.id`, id);
      setTimeout(() => {
        this.handleAdd();
      }, 10);
    }
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
            type: col.type || 'text',
            onEdit: this.onEdit,
          }),
        };
      }

      return col;
    });
  }

  public getCurrentProducts = () => {
    // TODO: Ensure that data ignores the selected products
    return currentProductsTree;
  }

  public render() {
    const { dataList } = this.props;

    return (
      <TableEntryContainer smallPadding>
        <NewProposedProduct onAdd={this.onAdd} data={this.getCurrentProducts()} />
        <Table
          rowKey={(rowKey) => (rowKey.id ? rowKey.id.toString() : 'new')}
          className={`table-general optimizer-table ${this.tableName}-table`}
          columns={this.getColumns()}
          dataSource={dataList}
          pagination={false}
          components={components}
        />
      </TableEntryContainer>
    );
  }
}

export default ProposedProduct;

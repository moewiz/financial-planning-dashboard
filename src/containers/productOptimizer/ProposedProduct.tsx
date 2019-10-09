import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { get, find } from 'lodash';
import cn from 'classnames';
import uuidv1 from 'uuid/v1';

import { TableEntryContainer } from '../../pages/client/styled';
import { Projections } from '../../components/Icons';
import NewProposedProduct from '../../components/ProductOptimizer/NewProposedProduct';
import { ProductTable } from '../../pages/client/productOptimizer/ProductOptimizer';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';
import { components } from './CurrentProduct';
import { EditCellType } from '../../components/StrategyPage/Drawer/EditCell';
import { proposedChoices } from '../../enums/proposedChoices';
import StandardText, { formatString, Param, Text } from '../../components/StrategyPage/StandardText';

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

interface ProposedProductProps extends ProductTable {
  tabKey: string;
  client?: {
    clientId: number;
    clientName: string;
  };
}

class ProposedProduct extends PureComponent<ProposedProductProps, ProposedProductState> {
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

  public cursorGoToProductField = () => {
    // Ensure the new row has been added
    setTimeout(() => {
      const productInput: HTMLElement | null = document.querySelector('#proposedTable .ant-input');
      if (productInput) {
        productInput.focus();
      }
    }, 200);
  }

  public cursorGoToValueField = () => {
    // Ensure the new row has been added
    setTimeout(() => {
      const productInput: HTMLElement | null = document.querySelector('#proposedTable .ant-input-number-input');
      if (productInput) {
        productInput.focus();
      }
    }, 200);
  }

  public onAdd = (values: string[]) => {
    const [action, productId] = values;
    const { fieldArrayRenderProps, client } = this.props;
    let newProduct: { [key: string]: any } = {};
    const clientName = get(client, 'clientName');

    if (productId) {
      const product = find(this.getCurrentProducts(), ['id', productId]);
      const productDescription = get(product, 'description');
      switch (action) {
        case proposedChoices.retain.value:
          newProduct = {
            ...newProduct,
            ...product,
            links: [product],
            note: {
              text: `{{0}}, retain your existing product {{1}}`,
              params: [clientName, productDescription],
            },
          };
          break;
        case proposedChoices.rebalance.value:
          newProduct = {
            ...newProduct,
            ...product,
            links: [product],
            note: {
              text: `{{0}}, rebalance your existing product {{1}}`,
              params: [clientName, productDescription],
            },
          };
          this.cursorGoToValueField();
          break;
        default:
          break;
      }
    } else {
      newProduct = {
        ...newProduct,
        description: '',
        value: null,
        note: {
          text: `{{0}}, add a new investment product`,
          params: [clientName],
        },
      };
      this.cursorGoToProductField();
    }

    fieldArrayRenderProps.unshift({ ...newProduct, id: uuidv1() });
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
    const { fieldArrayRenderProps, dataList, client } = this.props;
    const rowName = `${fieldArrayRenderProps.name}[${rowIndex}]`;
    const fieldName = `${rowName}.${name}`;
    fieldArrayRenderProps.form.setFieldValue(fieldName, value);

    const record = dataList[rowIndex];
    const remainingFieldName = name === 'description' ? 'value' : 'description';
    if (record && !record.id && value && record[remainingFieldName]) {
      const id = uuidv1();
      const clientName = get(client, 'clientName');
      fieldArrayRenderProps.form.setFieldValue(`${rowName}.id`, id);
      fieldArrayRenderProps.form.setFieldValue(`${rowName}.note`, {
        text: `{{0}}, add a new investment product`,
        params: [clientName],
      });

      setTimeout(() => {
        this.handleAdd();
      }, 10);
    }
  }

  public getColumns = () => {
    return this.columns.map((col) => {
      if (col.key === 'links') {
        return {
          ...col,
          onCell: (record: any, rowIndex: number) => ({
            ...col,
            record,
            rowIndex,
            type: col.type || 'text',
            onEdit: this.onEdit,
            options: {
              data: currentProductsTree,
            },
          }),
        };
      }

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
    const { fieldArrayRenderProps, tabKey } = this.props;
    const currentProducts: Product[] = get(fieldArrayRenderProps.form.values, [tabKey, 'current'], []);
    return currentProducts.filter((i) => i.id);
  }

  public render() {
    const { dataList } = this.props;

    return (
      <TableEntryContainer smallPadding id="proposedTable">
        <NewProposedProduct onAdd={this.onAdd} currentProducts={this.getCurrentProducts()} />
        <Table
          className={`table-general optimizer-table ${this.tableName}-table`}
          columns={this.getColumns()}
          dataSource={dataList.map((data, i: number) => ({ ...data, key: i }))}
          pagination={false}
          components={components}
          expandedRowRender={(row: Product) => {
            if (row.note) {
              return (
                <Text>
                  {formatString(row.note.text, row.note.params, (value, i) => (
                    <Param key={i}>{value}</Param>
                  ))}
                </Text>
              );
            }
            return null;
          }}
          defaultExpandAllRows={true}
          expandIcon={() => null}
        />
      </TableEntryContainer>
    );
  }
}

export default ProposedProduct;

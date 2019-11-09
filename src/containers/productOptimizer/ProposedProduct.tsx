import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { get, find, map, take, last } from 'lodash';
import cn from 'classnames';
import { useDrop } from 'react-dnd';
import uuid from 'uuid';

import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../pages/client/styled';
import { Projections } from '../../components/Icons';
import NewProposedProduct from '../../components/ProductOptimizer/NewProposedProduct';
import { ItemTypes, ProductTable } from '../../pages/client/productOptimizer/ProductOptimizer';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';
import { components } from './CurrentProduct';
import { EditCellType } from '../../components/StrategyPage/Drawer/EditCell';
import { proposedChoices } from '../../enums/proposedChoices';
import { formatString, Param, Text } from '../../components/StrategyPage/StandardText';
import { createEvent } from '../../utils/GA';
import { listenerCount } from 'cluster';
import { FieldArrayRenderProps } from 'formik';

interface ProposedProductState {
  loading: boolean;
  count: number;
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

interface ProductOpt extends Product {
  key: number;
}

interface ProposedProductProps extends ProductTable {
  tabKey: string;
  dataList: ProductOpt[];
  readOnly?: boolean;
}

const newText = '{{0}}, add a new investment product';
const retainText = '{{0}}, retain your existing product {{1}}';
const rebalanceText = '{{0}}, rebalance your existing product {{1}}';

class ProposedProduct extends PureComponent<ProposedProductProps, ProposedProductState> {
  public state = {
    loading: false,
    count: 0,
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
      width: 110,
      dollar: true,
      type: EditCellType.number,
      key: '1',
      editable: true,
      className: 'text-align-right',
    },
    {
      title: '',
      key: 'operation',
      render: (text: any, record: any, index: number) => {
        const { readOnly } = this.props;
        const isDisable = !record || !record.id;
        return (
          <>
            <Icon
              className={cn('projection', { disabled: isDisable })}
              component={Projections}
              onClick={() => !isDisable && this.openDrawer(record)}
            />
            {readOnly ? null : isDisable ? (
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

  public proposedProduct = (fieldArrayRenderProps: FieldArrayRenderProps) => ({
    body: {
      cell: components.body.cell,
      wrapper: (props: any) => {
        const [{ canDrop, isOver }, drop] = useDrop({
          accept: ItemTypes.ROW,
          drop: () => ({ name: 'Proposed Table', unshift: fieldArrayRenderProps.unshift }),
          collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
          }),
        });

        const isActive = canDrop && isOver;
        let backgroundColor = '#fff';
        if (isActive) {
          backgroundColor = '#e7e7ef';
        } else if (canDrop) {
          backgroundColor = '#f3f3f7';
        }

        return <tbody {...props} ref={drop} style={{ backgroundColor }} />;
      },
    },
  })

  public expandedRowRenderer = (row: Product, index: number, indent: number, expanded: boolean) => {
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
  }

  public componentDidMount() {
    const { dataList } = this.props;
    this.setState({ count: dataList.length + 1 });
  }

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

  public increaseCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  public onAdd = (values: string[]) => {
    const { fieldArrayRenderProps, client, readOnly } = this.props;
    const [action, productId] = values;
    if (readOnly || !fieldArrayRenderProps) {
      return;
    }
    const { count } = this.state;
    let newProduct: { [key: string]: any } = {};
    const clientName = get(client, 'name');

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
              text: retainText,
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
              text: rebalanceText,
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
          text: newText,
          params: [clientName],
        },
      };
      this.cursorGoToProductField();
    }

    createEvent('investment', 'create_proposed', action, get(client, 'id'));
    fieldArrayRenderProps.unshift({ ...newProduct, key: count, id: uuid() });
    this.increaseCount();
  }

  public onRemove = (record: any, index: number) => {
    if (record && record.id) {
      const { fieldArrayRenderProps, readOnly } = this.props;
      if (readOnly || !fieldArrayRenderProps) {
        return;
      }
      fieldArrayRenderProps.remove(index);
    }
  }

  public handleAdd: (row?: Product) => void = (row = { description: '', value: undefined }) => {
    const { count } = this.state;
    const { fieldArrayRenderProps, readOnly } = this.props;
    if (readOnly || !fieldArrayRenderProps) {
      return;
    }

    fieldArrayRenderProps.push({ ...row, key: count });
    this.increaseCount();
  }

  public onEdit = (value: any, name: string, rowIndex: number, isRemove: boolean = false) => {
    const { fieldArrayRenderProps, dataList, client, readOnly } = this.props;
    if (readOnly || !fieldArrayRenderProps) {
      return;
    }
    const rowName = `${fieldArrayRenderProps.name}[${rowIndex}]`;
    const fieldName = `${rowName}.${name}`;
    fieldArrayRenderProps.form.setFieldValue(fieldName, value);

    const record = dataList[rowIndex];
    const remainingFieldName = name === 'description' ? 'value' : 'description';
    const isLastRow = rowIndex === dataList.length - 1;
    if (record && isLastRow && !record.id && value && record[remainingFieldName]) {
      const id = uuid();
      const clientName = get(client, 'name');

      fieldArrayRenderProps.form.setFieldValue(`${rowName}.id`, id);
      fieldArrayRenderProps.form.setFieldValue(`${rowName}.note`, {
        text: newText,
        params: [clientName],
      });
      this.increaseCount();

      setTimeout(() => {
        this.handleAdd();
      }, 100);
    }
    if (isRemove) {
      createEvent('investment', 'unlink', undefined, get(client, 'id'));
    }
  }

  public onEditLink = (value: any, name: string, rowIndex: number, isRemove: boolean = false) => {
    const { fieldArrayRenderProps, client, readOnly } = this.props;
    if (readOnly || !fieldArrayRenderProps) {
      return;
    }
    const rowName = `${fieldArrayRenderProps.name}[${rowIndex}]`;
    const fieldName = `${rowName}.${name}`;

    fieldArrayRenderProps.form.setFieldValue(fieldName, value);
    const listProducts = map(value, 'description');
    const head = take(listProducts, listProducts.length - 1);
    const lastProduct = last(listProducts);

    fieldArrayRenderProps.form.setFieldValue(`${rowName}.note`, {
      text: `{{0}}, replace your existing product${head.length ? 's' : ''} {{1}}`,
      params: [get(client, 'name'), head.length ? `${head.join(', ')} and ${lastProduct}` : lastProduct],
    });
    createEvent('investment', 'link', undefined, get(client, 'id'));
  }

  public getColumns = () => {
    const { readOnly } = this.props;

    return this.columns.map((col) => {
      if (col.key === 'links') {
        return {
          ...col,
          onCell: (record: any, rowIndex: number) => ({
            ...col,
            readOnly,
            record,
            rowIndex,
            type: col.type || 'text',
            onEdit: this.onEditLink,
            options: {
              data: this.getCurrentProducts(),
            },
          }),
        };
      }

      if (col.editable) {
        return {
          ...col,
          onCell: (record: any, rowIndex: number) => ({
            ...col,
            readOnly,
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
    if (fieldArrayRenderProps) {
      const currentProducts: Product[] = get(fieldArrayRenderProps.form.values, [tabKey, 'current'], []);
      return currentProducts.filter((i) => i.id);
    }
    return [];
  }

  public render() {
    const { dataList, readOnly, fieldArrayRenderProps } = this.props;

    return (
      <TableEntryContainer smallPadding id="proposedTable">
        {!readOnly && fieldArrayRenderProps ? (
          <NewProposedProduct onAdd={this.onAdd} currentProducts={this.getCurrentProducts()} />
        ) : (
          <HeaderTitleTable>
            <TextTitle small={true}>Proposed</TextTitle>
          </HeaderTitleTable>
        )}
        <Table
          className={`table-general proposed-table optimizer-table ${this.tableName}-table`}
          columns={this.getColumns()}
          dataSource={dataList}
          pagination={false}
          components={!readOnly && fieldArrayRenderProps ? this.proposedProduct(fieldArrayRenderProps) : components}
          expandedRowRender={this.expandedRowRenderer}
          defaultExpandAllRows={true}
          expandIconAsCell={true}
          expandedRowKeys={map(dataList, 'key')}
          expandIcon={() => null}
        />
      </TableEntryContainer>
    );
  }
}

export default ProposedProduct;

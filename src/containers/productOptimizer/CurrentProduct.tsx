import React, { PureComponent } from 'react';
import { Icon, Table, Popconfirm } from 'antd';
import cn from 'classnames';
import { get, debounce } from 'lodash';
import uuidv1 from 'uuid/v1';

import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../pages/client/styled';
import { ProductTable } from '../../pages/client/productOptimizer/ProductOptimizer';
import { Projections } from '../../components/Icons';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';
import EditCell, { EditCellType } from '../../components/StrategyPage/Drawer/EditCell';

interface CurrentProductState {
  loading: boolean;
}

const EditCellContainer = (props: any) => {
  const { dataIndex, record, type, editable, onEdit, rowIndex } = props;
  const [value, setValue] = React.useState<any>(get(record, dataIndex));
  const debounceEdit = React.useCallback(
    debounce((val, name) => {
      onEdit(val, name, rowIndex);
    }, 250),
    [],
  );
  const onChange = (val: any, name: string) => {
    debounceEdit(val, name);
    setValue(val);
  };

  return (
    <td>
      {editable ? (
        <EditCell {...props} name={dataIndex} value={value} onChange={onChange} type={type} />
      ) : (
        props.children
      )}
    </td>
  );
};

const components = {
  body: {
    cell: EditCellContainer,
  },
};

class CurrentProduct extends PureComponent<ProductTable, CurrentProductState> {
  public state = {
    loading: false,
  };

  public columns = [
    {
      title: 'Product',
      dataIndex: 'description',
      options: {
        placeholder: 'Enter Description',
      },
      type: EditCellType.text,
      key: '0',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      options: {
        placeholder: 'Enter Value',
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
              onClick={() => !isDisable && this.openDrawer()}
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
  private tableName = 'current-product';

  public handleAdd: (row?: Product) => void = (row = { description: '', value: '' }) => {
    const { fieldArrayRenderProps } = this.props;
    fieldArrayRenderProps.push(row);
  }

  public openDrawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  }

  public onRemove = (record: any, index: number) => {
    if (record && record.id) {
      const { fieldArrayRenderProps } = this.props;
      fieldArrayRenderProps.remove(index);
    }
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
      // simulate call API to create a new product
      setTimeout(() => {
        this.handleAdd();
      }, 1000);
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

  public render() {
    const { dataList } = this.props;

    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <TextTitle small={true}>Current</TextTitle>
        </HeaderTitleTable>
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

export default CurrentProduct;

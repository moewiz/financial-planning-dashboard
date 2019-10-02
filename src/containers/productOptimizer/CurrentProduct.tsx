import React, { PureComponent, useState, useCallback, useEffect } from 'react';
import { Icon, Table, Popconfirm } from 'antd';
import cn from 'classnames';
import { get, debounce, map, filter } from 'lodash';
import uuidv1 from 'uuid/v1';

import { HeaderTitleTable, TableEntryContainer, TextTitle, TagStyled, TagList } from '../../pages/client/styled';
import { ProductTable } from '../../pages/client/productOptimizer/ProductOptimizer';
import { Projections } from '../../components/Icons';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';
import EditCell, { EditCellType } from '../../components/StrategyPage/Drawer/EditCell';
import LinkCurrentProduct from '../../components/StrategyPage/Drawer/LinkCurrentProduct';

interface CurrentProductState {
  loading: boolean;
}

const EditCellContainer = (props: any) => {
  const { dataIndex, record, type, editable, onEdit, rowIndex, showLinks } = props;
  const [value, setValue] = useState<any>(get(record, dataIndex));
  useEffect(() => {
    setValue(get(record, dataIndex));
  }, [get(record, dataIndex)]);
  const debounceEdit = useCallback(
    debounce((val, name, index) => {
      onEdit(val, name, index);
    }, 500),
    [],
  );
  const onChange = (val: any, name: string) => {
    setValue(val);
    debounceEdit(val, name, rowIndex);
  };

  if (editable && type === EditCellType.linkCurrentProduct) {
    return (
      <td>
        {record && record.id && <LinkCurrentProduct {...props} name={dataIndex} value={value} onChange={onChange} />}
      </td>
    );
  }

  return (
    <td className={props.className}>
      {editable ? (
        <EditCell
          {...props}
          name={dataIndex}
          value={value}
          onChange={onChange}
          type={type}
          disabled={record.id === -1 && dataIndex === 'percentage'}
        />
      ) : (
        props.children
      )}
      {showLinks && (
        <TagList>
          {map(get(record, 'links', []), (product) => (
            <TagStyled
              key={product.id}
              closable={true}
              color="#e2e2e2"
              onClose={() =>
                onEdit(filter(get(record, 'links', []), (link) => link.id !== product.id), 'links', rowIndex)
              }
            >
              {product.description}
            </TagStyled>
          ))}
        </TagList>
      )}
    </td>
  );
};

export const components = {
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
  private tableName = 'current-product';

  public handleAdd: (row?: Product) => void = (row = { description: '', value: '' }) => {
    const { fieldArrayRenderProps } = this.props;
    fieldArrayRenderProps.push(row);
  }

  public openDrawer = (record: any) => {
    const { openDrawer } = this.props;
    openDrawer(record);
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

  public render() {
    const { dataList } = this.props;

    return (
      <TableEntryContainer smallPadding>
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

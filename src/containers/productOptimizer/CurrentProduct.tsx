import React, { PureComponent } from 'react';
import { Icon, Table, Popconfirm } from 'antd';
import cn from 'classnames';
import { get } from 'lodash';

import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../pages/client/styled';
import { ProductProps } from '../../pages/client/productOptimizer/ProductOptimizer';
import { Projections } from '../../components/Icons';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';
import EditCell, { EditCellType } from '../../components/StrategyPage/Drawer/EditCell';

interface CurrentProductState {
  loading: boolean;
}

const EditCellContainer = (props: any) => {
  const { dataIndex, record, type, editable, onEdit } = props;
  const [value, setValue] = React.useState<any>(get(record, dataIndex));
  const onChange: (value: any, name: string) => void = (val) => {
    onEdit(val, name, record);
    setValue(val);
  };

  return <td>{editable ? <EditCell {...props} value={value} onChange={onChange} type={type} /> : props.children}</td>;
};

const components = {
  body: {
    cell: EditCellContainer,
  },
};

class CurrentProduct extends PureComponent<ProductProps, CurrentProductState> {
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
      render: (text: any, record: any) => {
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
  private tableName = 'current-product';

  public handleAdd = () => {
    // this.setState(({ dataList }) => ({ dataList: [...dataList, { description: '', value: '' }] }));
  }

  public openDrawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  }

  public onRemove = (record: any) => {
    if (record && record.id) {
      // this.setState(({ dataList }) => ({ dataList: dataList.filter(({ id }) => id !== record.id) }));
    }
  }

  public onEdit = (value: any, name: string, record: any) => {
    if (record && record.id) {
      return;
    }

    console.log('setFieldValue here');
    console.log({ value, name, record });
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

  public getDataList = () => {
    const { dataList } = this.props;

    return [...dataList, { description: '', value: '' }];
  }

  public render() {
    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle small={true}>Current</TextTitle>
        </HeaderTitleTable>
        <Table
          rowKey={(rowKey) => rowKey.id ? rowKey.id.toString() : 'new'}
          className={`table-general optimizer-table ${this.tableName}-table`}
          columns={this.getColumns()}
          dataSource={this.getDataList()}
          pagination={false}
          components={components}
        />
      </TableEntryContainer>
    );
  }
}

export default CurrentProduct;

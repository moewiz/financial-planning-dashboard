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
  dataList: Product[];
}

const EditCellContainer = (props: any) => {
  const { dataIndex, record, type, editable } = props;
  const [value, setValue] = React.useState<any>(get(record, dataIndex));

  return (
    <td>
      {editable ? <EditCell {...props} value={value} onChange={(val) => setValue(val)} type={type} /> : props.children}
    </td>
  );
};

const components = {
  body: {
    cell: EditCellContainer,
  },
};

class CurrentProduct extends PureComponent<ProductProps, CurrentProductState> {
  public state = {
    loading: false,
    dataList: [
      {
        id: 1,
        description: 'Product A',
        value: 10000,
      },
      {
        id: 2,
        description: 'Product B',
        value: 10000,
      },
      {
        id: 3,
        description: 'Product C',
        value: 10000,
      },
    ],
  };
  public columns = [
    {
      title: 'Product',
      dataIndex: 'description',
      type: EditCellType.text,
      key: '0',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
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
    this.setState(({ dataList }) => ({ dataList: [...dataList, { description: '', value: '' }] }));
  }

  public openDrawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  }

  public onRemove = (record: any) => {
    if (record && record.id) {
      this.setState(({ dataList }) => ({ dataList: dataList.filter(({ id }) => id !== record.id) }));
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
          }),
        };
      }

      return col;
    });
  }

  public render() {
    const { dataList, loading } = this.state;

    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle small={true}>Current</TextTitle>
        </HeaderTitleTable>
        <Table
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

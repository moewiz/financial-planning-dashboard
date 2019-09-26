import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import cn from 'classnames';

import { AssetBlock, AssetSubTitle, AssetTitle, AssetTitleBlock } from './styled';
import { TableEntryContainer } from '../../../pages/client/styled';
import { components } from '../../../containers/productOptimizer/CurrentProduct';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';

interface Row {
  id?: number;
  name: string;
  value: string | number;
  percentage?: string | number;
  [key: string]: any;
}

interface FeeProps {
  product: {
    title: string;
    subTitle: string;
    ongoingFee: Row[];
    transactionFee: Row[];
    otherBalances: Row[];
  };
}

class Fee extends PureComponent<FeeProps> {
  public columns = [
    {
      title: 'Ongoing Fee',
      dataIndex: 'name',
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
      key: '1',
      width: 80,
      className: 'text-align-center',
    },
    {
      title: '%',
      dataIndex: 'percentage',
      className: 'text-align-center',
      options: {
        min: 0,
        max: 100,
        formatter: (value: any) => `${value}%`,
        parser: (value: any) => value.replace('%', ''),
      },
      key: '2',
      width: 60,
    },
    {
      title: '',
      dataIndex: 'remove',
      width: 30,
      key: '3',
    },
  ];
  public onEdit = (value: any, name: string, rowIndex: number) => {
    console.log({ value, name, rowIndex });
  }
  public getColumns = (title: string) => () => {
    let columns = [...this.columns];
    if (title === 'Other Balances') {
      columns = columns.filter((col) => col.dataIndex !== 'percentage');
    }
    return columns.map((col) => {
      col.title = col.dataIndex === 'name' ? title : col.title;
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

      if (col.dataIndex === 'remove') {
        return {
          ...col,
          render: (text: any, record: any, fundIndex: number) => {
            if (record && record.id && record.id !== -1) {
              return (
                <Popconfirm
                  title="Really delete?"
                  onConfirm={() => {
                    console.log('remove');
                  }}
                >
                  <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
                </Popconfirm>
              );
            }
            return null;
          },
        };
      }
      return col;
    });
  }
  public render() {
    const { product } = this.props;

    if (!product) {
      return null;
    }

    const { title, subTitle, ongoingFee, transactionFee, otherBalances } = product;

    return (
      <AssetBlock>
        <AssetTitleBlock>
          <AssetTitle>{title}</AssetTitle>
          <AssetSubTitle>{subTitle}</AssetSubTitle>
        </AssetTitleBlock>
        <TableEntryContainer drawer>
          <Table
            rowKey={(rowKey) => (rowKey.id ? rowKey.id.toString() : 'new')}
            className={cn('table-general drawer-fund-table linked-product')}
            columns={this.getColumns('Ongoing Fee')()}
            dataSource={ongoingFee}
            pagination={false}
            components={components}
          />
        </TableEntryContainer>
        <TableEntryContainer drawer>
          <Table
            rowKey={(rowKey) => (rowKey.id ? rowKey.id.toString() : 'new')}
            className={cn('table-general drawer-fund-table linked-product no-bold')}
            columns={this.getColumns('Transaction Fee')()}
            dataSource={transactionFee}
            pagination={false}
            components={components}
          />
        </TableEntryContainer>
        <TableEntryContainer drawer>
          <Table
            rowKey={(rowKey) => (rowKey.id ? rowKey.id.toString() : 'new')}
            className={cn('table-general drawer-fund-table linked-product no-bold')}
            columns={this.getColumns('Other Balances')()}
            dataSource={otherBalances}
            pagination={false}
            components={components}
          />
        </TableEntryContainer>
      </AssetBlock>
    );
  }
}

export default Fee;

import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import cn from 'classnames';

import { AssetBlock, AssetSubTitle, AssetTitle, AssetTitleBlock } from './styled';
import { TableEntryContainer } from '../../../pages/client/styled';
import { components } from '../../../containers/productOptimizer/CurrentProduct';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';

const onGoingFee = [
  {
    id: 1,
    name: 'Administration Fees',
    value: '248.33',
    percentage: '0.50',
  },
  {
    id: 2,
    name: 'Investment Fees and Costs',
    value: '489.45',
    percentage: '0.98',
  },
  {
    id: 3,
    name: 'Expense Recovery Fees',
    value: '0.00',
    percentage: '0.00',
  },
  { id: -1, name: '', value: '', percentage: '' },
  {
    name: 'Gross On-going Costs',
    value: '657.98',
    percentage: '0.98',
  },
];

const transactionFee = [
  {
    id: 1,
    name: 'Buy/Sell Spread',
    value: '130.30',
    percentage: '0.26',
  },
  { id: -1, name: '', value: '', percentage: '' },
];

const otherBalances = [
  {
    id: 1,
    name: 'Total balance held by client',
    value: '500,000',
  },
  {
    id: 2,
    name: 'Total balance held by family group me...',
    value: '500,000',
  },
  { id: -1, name: '', value: '' },
];

interface FeeProps {
  title: string;
  subTitle: string;
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
    const { title, subTitle } = this.props;

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
            dataSource={onGoingFee}
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

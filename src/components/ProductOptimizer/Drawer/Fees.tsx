import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import cn from 'classnames';

import { AssetBlock, AssetsAllocationWrapper, AssetSubTitle, AssetTitle, AssetTitleBlock, FeesWrapper } from './styled';
import { TableEntryContainer } from '../../../pages/client/styled';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';
import { components } from '../../../containers/productOptimizer/CurrentProduct';

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
  { name: '', value: '', percentage: '' },
];

class Fees extends PureComponent {
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

      if (col.dataIndex === 'remove') {
        return {
          ...col,
          render: (text: any, record: any, fundIndex: number) => {
            if (record && record.id !== -1) {
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
    return (
      <FeesWrapper>
        <AssetBlock>
          <AssetTitleBlock>
            <AssetTitle>Product A</AssetTitle>
            <AssetSubTitle>RoP - alternative</AssetSubTitle>
          </AssetTitleBlock>
          <TableEntryContainer drawer>
            <Table
              rowKey={(rowKey) => (rowKey.id ? rowKey.id.toString() : 'new')}
              className={cn('table-general drawer-fund-table linked-product')}
              columns={this.getColumns()}
              dataSource={onGoingFee}
              pagination={false}
              components={components}
            />
          </TableEntryContainer>
        </AssetBlock>
      </FeesWrapper>
    );
  }
}

export default Fees;

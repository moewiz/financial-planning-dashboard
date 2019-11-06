import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { last, take } from 'lodash';
import cn from 'classnames';
import numeral from 'numeral';

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

export interface FeeProps {
  product: {
    title: string;
    subTitle: string;
    ongoingFee: Row[];
    transactionFee: Row[];
    otherBalances?: Row[];
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
      className: 'text-align-right',
      editable: true,
      dollar: true,
      type: EditCellType.number,
      options: {
        precision: 2,
      },
    },
    {
      title: '%',
      dataIndex: 'percentage',
      className: 'text-align-right',
      options: {
        min: 0,
        max: 100,
        formatter: (value: any) => `${value}%`,
        parser: (value: any) => value.replace('%', ''),
        precision: 2,
      },
      key: '2',
      width: 80,
      editable: true,
      type: EditCellType.number,
    },
    {
      title: '',
      dataIndex: 'remove',
      width: 28,
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

  public renderFooter = (tableData: Row[]) => () => {
    const totalRow = last(tableData);

    if (totalRow) {
      return (
        <>
          <div className="title">
            {totalRow.name}
          </div>
          <div className="value">
            {numeral(totalRow.value).format('$0,0.00')}
          </div>
        </>
      );
    }

    return undefined;
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
            dataSource={take(ongoingFee, ongoingFee.length - 1)}
            pagination={false}
            scroll={{ y: 265 }}
            components={components}
            footer={this.renderFooter(ongoingFee)}
          />
        </TableEntryContainer>
        <TableEntryContainer drawer>
          <Table
            rowKey={(rowKey) => (rowKey.id ? rowKey.id.toString() : 'new')}
            className={cn('table-general drawer-fund-table linked-product no-bold')}
            columns={this.getColumns('Transaction Fee')()}
            dataSource={transactionFee}
            pagination={false}
            scroll={{ y: 265 }}
            components={components}
          />
        </TableEntryContainer>
        {otherBalances && (
          <TableEntryContainer drawer>
            <Table
              rowKey={(rowKey) => (rowKey.id ? rowKey.id.toString() : 'new')}
              className={cn('table-general drawer-fund-table linked-product no-bold')}
              columns={this.getColumns('Other Balances')()}
              dataSource={otherBalances}
              pagination={false}
              scroll={{ y: 265 }}
              components={components}
            />
          </TableEntryContainer>
        )}
      </AssetBlock>
    );
  }
}

export default Fee;

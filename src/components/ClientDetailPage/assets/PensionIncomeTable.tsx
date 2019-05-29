import React, { Component } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { InnerTableContainer, HeaderTitleTable, TextTitle, DivideLine } from '../../../pages/client/styled';
import { removePartnerOption } from '../../../utils/columnUtils';
import { from1Options, pensionIncomeTypeOptions, to1Options } from '../../../enums/options';
import { components } from './ContributionWithdrawalsTable';

interface ContributionWithdrawalsTableProps {
  maritalState: string;
  data: object[];
  index: number;
  titleTable?: string;
  tableName: string;
  addRow: (index: number, tableName: string, row: any) => void;
  deleteRow: (index: number, tableName: string, key: number) => void;
}

class PensionIncomeTable extends Component<ContributionWithdrawalsTableProps, {}> {
  public columns = [
    {
      key: 'operation',
      editable: false,
      width: 12,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 140,
      type: 'select',
      options: pensionIncomeTypeOptions,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '1',
      width: 120,
      type: 'number',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '2',
      width: 120,
      type: 'date',
      pickerType: 'custom',
      options: from1Options,
      className: 'table-expand-datepicker',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '3',
      width: 120,
      type: 'date',
      pickerType: 'custom',
      className: 'table-expand-datepicker',
      options: to1Options,
    },
  ];
  public handleDelete = (key: number) => {
    const { index, tableName, deleteRow } = this.props;
    deleteRow(index, tableName, key);
  }

  public handleAdd = () => {
    const { index, tableName, addRow } = this.props;
    const newData = {
      key: Date.now(),
      type: 'minimum',
      value: 100000.0,
      from: {
        type: 'start',
        yearValue: null,
      },
      to: {
        type: 'end',
        yearValue: null,
      },
    };
    addRow(index, tableName, newData);
  }

  public render(): React.ReactNode {
    const { titleTable, data, maritalState, index, tableName } = this.props;
    const columns = this.columns.map((col: any) => {
      if (col.key === 'operation') {
        return {
          ...col,
          title: '',
          className: 'operation',
          render: (text: any, record: any) => (
            <Popconfirm title="Really delete?" onConfirm={() => this.handleDelete(record.key)}>
              <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
            </Popconfirm>
          ),
        };
      }
      const options = removePartnerOption(col, maritalState);
      let editable = col.key === 'operation' ? false : 'true';

      return {
        ...col,
        fixed: false,
        onCell: (record: any, rowIndex: number) => {
          if (col.dataIndex === 'value') {
            editable = record.type === 'custom';
          }
          return {
            ...col,
            options,
            rowIndex,
            tableName: `assets[${index}].${tableName}`,
            type: col.type || 'text',
            record,
            editable,
            smallInput: true,
          };
        },
      };
    });

    return (
      <InnerTableContainer>
        <HeaderTitleTable small={true}>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle small={true}>{titleTable}</TextTitle>
          <DivideLine />
        </HeaderTitleTable>
        <Table
          className="contribution-withdrawals-table"
          columns={columns}
          dataSource={data}
          pagination={false}
          components={components}
          size={'small'}
        />
      </InnerTableContainer>
    );
  }
}

export default PensionIncomeTable;

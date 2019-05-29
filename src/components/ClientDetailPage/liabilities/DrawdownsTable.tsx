import React, { Component } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { InnerTableContainer, DivideLine, HeaderTitleTable, TextTitle } from '../../../pages/client/styled';
import { removePartnerOption } from '../../../utils/columnUtils';
import { components } from '../assets/ContributionWithdrawalsTable';
import { from1Options, to1Options } from '../../../enums/options';

interface DrawdownsTableProps {
  maritalState: string;
  data: object[];
  index: number;
  titleTable?: string;
  tableName: string;
  addRow: (index: number, tableName: string, row: any) => void;
  deleteRow: (index: number, tableName: string, key: number) => void;
}

class DrawdownsTable extends Component<DrawdownsTableProps> {
  public columns = [
    {
      title: '',
      key: 'operation',
      className: 'operation',
      width: 12,
      render: (text: any, record: any) => (
        <Popconfirm title="Really delete?" onConfirm={() => this.handleDelete(record.key)}>
          <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
        </Popconfirm>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: 140,
      type: 'number',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '1',
      width: 120,
      type: 'date',
      pickerType: 'custom',
      options: from1Options,
      className: 'table-expand-datepicker',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '2',
      width: 120,
      type: 'date',
      pickerType: 'custom',
      options: to1Options,
      className: 'table-expand-datepicker',
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
      value: 18000.0,
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

  public render() {
    const { data, maritalState, index, tableName } = this.props;
    const columns = this.columns.map((col) => {
      const options = removePartnerOption(col, maritalState);
      const editable = col.key === 'operation' ? false : 'true';

      return {
        ...col,
        fixed: false,
        onCell: (record: any, rowIndex: number) => ({
          ...col,
          options,
          rowIndex,
          tableName: `liabilities[${index}].${tableName}`,
          type: col.type || 'text',
          record,
          editable,
          smallInput: true,
        }),
      };
    });

    return (
      <InnerTableContainer>
        <HeaderTitleTable small={true}>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle small={true}>{'Drawdowns'}</TextTitle>
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

export default DrawdownsTable;

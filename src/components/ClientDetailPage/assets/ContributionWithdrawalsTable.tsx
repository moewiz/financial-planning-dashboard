import React, { Component } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { InnerTableContainer, HeaderTitleTable, TextTitle, DivideLine } from '../../../pages/client/styled';
import { TweenOneGroup } from 'rc-tween-one';
import { removePartnerOption } from '../../../utils/columnUtils';
import EditableCell from './EditableCell';

interface ContributionWithdrawalsTableProps {
  columns: object[];
  maritalState: string;
  data: object[];
  index: number;
  titleTable?: string;
  tableName: string;
  addRow: (index: number, tableName: string, row: any) => void;
  deleteRow: (index: number, tableName: string, key: number) => void;
}
const enterAnim = [
  {
    opacity: 0,
    x: 30,
    duration: 0,
    backgroundColor: '#fffeee',
  },
  {
    duration: 200,
    type: 'from',
    delay: 250,
    ease: 'easeOutQuad',
  },
  {
    opacity: 1,
    x: 0,
    duration: 250,
    ease: 'easeOutQuad',
  },
  { delay: 1000, backgroundColor: 'initial' },
];
const leaveAnim = [{ duration: 250, opacity: 0 }, { duration: 200, ease: 'easeOutQuad' }];

export const AnimTag = ($props: any) => {
  return <TweenOneGroup component="tbody" enter={enterAnim} leave={leaveAnim} appear={false} exclusive {...$props} />;
};

export const components = {
  body: {
    // wrapper: AnimTag,
    cell: EditableCell,
  },
};

class ContributionWithdrawalsTable extends Component<ContributionWithdrawalsTableProps, {}> {
  public handleDelete = (key: number) => {
    const { index, tableName, deleteRow } = this.props;
    deleteRow(index, tableName, key);
  }

  public handleAdd = () => {
    const { index, tableName, addRow } = this.props;
    const newData = {
      key: Date.now(),
      type: 'contribution',
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
    const { titleTable, data, maritalState, index, tableName, columns: columnsProps } = this.props;
    const columns = columnsProps.map((col: any) => {
      if (col.key === 'operation') {
        return {
          ...col,
          title: '',
          className: 'operation',
          render: (text: any, record: any) => (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
            </Popconfirm>
          ),
        };
      }
      const options = removePartnerOption(col, maritalState);
      const editable = col.key === 'operation' ? false : 'true';

      return {
        ...col,
        fixed: false,
        onCell: (record: any, rowIndex: number) => ({
          ...col,
          options,
          rowIndex,
          tableName: `assets[${index}].${tableName}`,
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

export default ContributionWithdrawalsTable;

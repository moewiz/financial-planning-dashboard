import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { InnerTableContainer, HeaderTitleTable, TextTitle, DivideLine } from '../../../pages/client/styled';
import { TweenOneGroup } from 'rc-tween-one';
import { from1Options, to1Options } from '../../../enums/options';
import { removePartnerOption } from '../../../utils/columnUtils';
import EditableCell from './EditableCell';
import { addKeyToArray } from '../DataEntry';

interface ContributionWithdrawalsTableProps {
  maritalState: string;
  data: object[];
  index: number;
  titleTable?: string;
  tableName: string;
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

export const components = { body: { wrapper: AnimTag, cell: EditableCell } };

class ContributionWithdrawalsTable extends PureComponent<ContributionWithdrawalsTableProps, {}> {
  public columns = [
    {
      title: '',
      key: 'operation',
      width: 18,
      className: 'operation',
      render: (text: any, record: any) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
          <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
        </Popconfirm>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 140,
      type: 'select',
      options: [{ value: 'contribution', label: 'Contribution' }, { value: 'withdrawals', label: 'Withdrawals' }],
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '1',
      width: 120,
      type: 'text',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '2',
      width: 120,
      type: 'date',
      pickerType: 'custom',
      options: from1Options,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '3',
      width: 120,
      type: 'date',
      pickerType: 'custom',
      options: to1Options,
    },
  ];

  public handleDelete = (key: string) => {};

  public handleAdd = () => {
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
  }

  public render(): React.ReactNode {
    const { titleTable, data, maritalState, index, tableName } = this.props;
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
          tableName: `assets[${index}].${tableName}`,
          type: col.type || 'text',
          record,
          editable,
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
          dataSource={addKeyToArray(data)}
          pagination={false}
          components={components}
          size={'small'}
        />
      </InnerTableContainer>
    );
  }
}

export default ContributionWithdrawalsTable;

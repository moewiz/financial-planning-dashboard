import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { InnerTableContainer, HeaderTitleTable, TextTitle, DivideLine } from '../../../pages/client/styled';
import { TweenOneGroup } from 'rc-tween-one';

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

const components = { body: { wrapper: AnimTag } };

class ContributionWithdrawalsTable extends PureComponent {
  public state = {
    dataSource: [
      {
        key: '0',
        type: 'Contribution',
        value: 100000,
        from: 'start',
        to: 'End',
      },
      {
        key: '1',
        type: 'Withdrawals',
        value: 50000,
        from: 'start',
        to: 'End',
      },
    ],
    count: 2,
  };

  public columns = [
    {
      title: '',
      key: 'operation',
      width: 18,
      className: 'operation',
      render: (text: any, record: any) =>
        this.state.dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
          </Popconfirm>
        ) : null,
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
      options: [
        { value: 'start', label: 'Start' },
        { value: 'clientRetirement', label: `Client's Retirement` },
        { value: 'partnerRetirement', label: `Partner's Retirement` },
      ],
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '3',
      width: 120,
      type: 'date',
      pickerType: 'custom',
      options: [
        { value: 'end', label: 'End' },
        { value: 'clientRetirement', label: `Client's Retirement` },
        { value: 'partnerRetirement', label: `Partner's Retirement` },
      ],
    },
  ];

  public handleDelete = (key: string) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) });
  }

  public handleAdd = () => {
    const { count, dataSource } = this.state;
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
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  public render() {
    const { dataSource } = this.state;
    const columns = this.columns.map((col) => {
      return {
        ...col,
        fixed: false,
        onCell: (record: any) => ({
          record,
          editable: 'true',
          title: col.title,
        }),
      };
    });
    return (
      <InnerTableContainer>
        <HeaderTitleTable small={true}>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle small={true}>{'Contribution/Withdrawals'}</TextTitle>
          <DivideLine />
        </HeaderTitleTable>
        <Table columns={columns} dataSource={dataSource} pagination={false} components={components} size={'small'} />
      </InnerTableContainer>
    );
  }
}

export default ContributionWithdrawalsTable;

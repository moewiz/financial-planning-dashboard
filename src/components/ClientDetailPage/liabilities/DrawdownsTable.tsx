import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { InnerTableContainer, DivideLine, HeaderTitleTable, TextTitle } from '../../../pages/client/styled';

class DrawdownsTable extends PureComponent {
  public state = {
    dataSource: [
      {
        key: '0',
        type: 'Custom',
        value: 25000,
        from: 'start',
        to: 'End',
      },
    ],
    count: 1,
  };

  public columns = [
    {
      title: '',
      key: 'operation',
      className: 'operation',
      width: 18,
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
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '1',
      width: 120,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: '2',
      width: 120,
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: '3',
      width: 120,
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
          <TextTitle small={true}>{'Drawdowns'}</TextTitle>
          <DivideLine />
        </HeaderTitleTable>
        <Table columns={columns} dataSource={dataSource} pagination={false} size={'small'} />
      </InnerTableContainer>
    );
  }
}

export default DrawdownsTable;

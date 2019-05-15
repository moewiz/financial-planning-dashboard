import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { InnerTableContainer, DivideLine, HeaderTitleTable, TextTitle } from '../../../pages/client/styled';

class CoverDetailsTable extends PureComponent {
  public state = {
    dataSource: [
      {
        key: '0',
        type: 'Custom',
        value: 25000,
        from: 'start',
        to: 'End',
      },
      {
        key: '1',
        type: 'Custom',
        value: 10000,
        from: 'start',
        to: 'End',
      },
      {
        key: '2',
        type: 'Custom',
        value: 25000,
        from: 'start',
        to: 'End',
      },
      {
        key: '3',
        type: 'Custom',
        value: 15000,
        from: 'start',
        to: 'End',
      },
    ],
    count: 4,
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
      coverType: 'life',
      policyOwner: 'superFund',
      benefitAmount: 200000.0,
      premiumType: 'stepped',
      notes: 'Sample Note.',
      expandable: {
        isLinked: false,
        linkedProduct: null,
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
          <TextTitle small={true}>{'Cover Details'}</TextTitle>
          <DivideLine />
        </HeaderTitleTable>
        <Table columns={columns} dataSource={dataSource} pagination={false} size={'small'} />
      </InnerTableContainer>
    );
  }
}

export default CoverDetailsTable;

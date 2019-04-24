import React, { PureComponent } from 'react';
import { Button, Icon, Popconfirm, Table } from 'antd';

interface DataEntryTableProps {
  name: string;
  icon?: React.ReactNode;
  expanded?: boolean;
  add?: boolean;
}

class DataEntryTable extends PureComponent<DataEntryTableProps> {
  protected static defaultProps = {
    expanded: true,
  };
  public state = {
    dataSource: [
      {
        key: '0',
        description: 'Client',
        firstName: 'Jack',
        lastName: 'Rayan',
        dob: 1555924936,
        empStatus: 'selfEmployed',
        retirementYear: 1555924936,
        maritalState: 'married',
        expandable: {
          riskProfile: 'defensive',
          hasPrivateHealthInsurance: true,
          lookingForCoupleAdvice: false,
        },
      },
      {
        key: '1',
        description: 'Partner',
        firstName: 'Susane',
        lastName: 'Diaz',
        dob: 1555924936,
        empStatus: 'unemployed',
        retirementYear: '',
        maritalState: 'married',
        expandable: {
          riskProfile: 'highGrowth',
          hasPrivateHealthInsurance: false,
          jointRiskProfile: 'defensive',
        },
      },
    ],
    count: 2,
  };

  public columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: 130,
      fixed: 'left',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: '1',
      width: 120,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: '2',
      width: 120,
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: '3',
      width: 120,
    },
    {
      title: 'Emp Status',
      dataIndex: 'empStatus',
      key: '4',
      width: 120,
    },
    {
      title: 'Retirement Year',
      dataIndex: 'retirementYear',
      key: '5',
      width: 120,
    },
    {
      title: 'Marital State',
      dataIndex: 'maritalState',
      key: '6',
      width: 120,
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text: any, record: any) =>
        this.state.dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            <a href="javascript:">Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  public handleDelete = (key: string) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) });
  }

  public handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  public renderExpandable = (expandable: any = {}) => {
    return (
      <>
        <p>{expandable.riskProfile}</p>
        <p>{expandable.hasPrivateHealthInsurance}</p>
        <p>{expandable.jointRiskProfile}</p>
      </>
    );
  }

  public render() {
    const { icon, name, expanded, add } = this.props;
    const { dataSource } = this.state;
    const columns = this.columns.map((col) => {
      return {
        ...col,
        fixed: col.fixed || false,
        onCell: (record: any) => ({
          record,
          editable: true,
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });

    return (
      <>
        <div>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          {icon}
          {name}
        </div>
        <Table
          // @ts-ignore
          columns={columns}
          scroll={{ x: 950, y: 300 }}
          dataSource={dataSource}
          expandedRowRender={(record) => (record.expandable ? this.renderExpandable(record.expandable) : null)}
          pagination={false}
        />

        {/*{expanded ? (*/}
        {/*  <Table*/}
        {/*    columns={columns}*/}
        {/*    expandedRowRender={(record) =>*/}
        {/*      record.description ? <p style={{ margin: 0 }}>{record.description}</p> : null*/}
        {/*    }*/}
        {/*    dataSource={data}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <Table columns={columns} dataSource={data} />*/}
        {/*)}*/}
      </>
    );
  }
}

export default DataEntryTable;

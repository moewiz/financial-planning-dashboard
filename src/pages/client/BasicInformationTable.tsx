import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import ExpandedBasicInformationRow, {BasicInformation} from './ExpandedBasicInformationRow';

class BasicInformationTable extends PureComponent {
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
      // fixed: 'left',
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
      width: 140,
    },
    {
      title: 'Marital State',
      dataIndex: 'maritalState',
      key: '6',
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
    const { dataSource } = this.state;
    const columns = this.columns.map((col) => {
      return {
        ...col,
        fixed: false,
        // fixed: col.fixed || false,
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
          <Icon type={'user'} />
          {'Basic Information'}
        </div>
        <Table
          // @ts-ignore
          columns={columns}
          // scroll={{ x: 850, y: 300 }}
          dataSource={dataSource}
          expandedRowRender={ExpandedBasicInformationRow}
          pagination={false}
        />
      </>
    );
  }
}

export default BasicInformationTable;

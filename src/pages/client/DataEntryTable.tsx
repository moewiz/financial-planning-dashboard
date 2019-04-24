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
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      },
      {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      },
    ],
    count: 2,
  };

  private columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text: any, record: any) =>
        this.state.dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            <a href="javascript:;">Delete</a>
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

  public render() {
    const { icon, name, expanded, add } = this.props;
    const { dataSource } = this.state;
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
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
        <Table columns={columns} dataSource={dataSource} pagination={false} />

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

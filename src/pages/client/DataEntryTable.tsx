import React, { PureComponent } from 'react';
import { Icon, Popconfirm, Table } from 'antd';

interface DataEntryTableProps {
  name: string;
  icon?: React.ReactNode;
  expanded?: boolean;
  add?: boolean;
}

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => (
      <Popconfirm title="Are you sure？" icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
        <a href="#">Delete</a>
      </Popconfirm>
    ),
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    // description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

class DataEntryTable extends PureComponent<DataEntryTableProps> {
  protected static defaultProps = {
    expanded: true,
  };

  public render() {
    const { icon, name, expanded, add } = this.props;

    return (
      <>
        <div>
          {icon}
          {name}
        </div>

        {expanded ? (
          <Table
            columns={columns}
            expandedRowRender={(record) =>
              record.description ? <p style={{ margin: 0 }}>{record.description}</p> : null
            }
            dataSource={data}
          />
        ) : (
          <Table columns={columns} dataSource={data} />
        )}
      </>
    );
  }
}

export default DataEntryTable;

import React, { PureComponent } from 'react';
import { Icon, Table } from 'antd';

import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../pages/client/styled';
import { Projections } from '../../components/Icons';

const data = [
  {
    description: 'New proposed 1',
    value: '10,000',
  },
];

class ProposedProduct extends PureComponent {
  public state = {
    loading: false,
  };
  public columns = [
    {
      title: '',
      key: 'link',
      className: 'text-align-center',
      render: (text: any, record: any) => (
        <Icon type="link" style={{ transform: 'rotate(45deg)' }} />
      ),
      width: 30,
    },
    {
      title: 'Product',
      dataIndex: 'description',
      type: 'text',
      key: '0',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      type: 'number',
      key: '1',
    },
    {
      title: '',
      key: 'operation',
      render: (text: any, record: any) => (
        <>
          <Icon component={Projections} style={{ marginRight: 10 }} />
          <Icon type="close-square" style={{ fontSize: '16px' }} />
        </>
      ),
      width: 60,
    },
  ];
  private tableName = 'proposed-product';

  public handleAdd = () => {
    console.log('add new proposed product');
  }

  public render() {
    const { loading } = this.state;

    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle small={true}>Proposed</TextTitle>
        </HeaderTitleTable>
        <Table
          className={`table-general ${this.tableName}-table`}
          columns={this.columns}
          dataSource={data}
          pagination={false}
        />
      </TableEntryContainer>
    );
  }
}

export default ProposedProduct;

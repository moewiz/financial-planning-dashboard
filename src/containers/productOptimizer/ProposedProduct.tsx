import React, { PureComponent } from 'react';
import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../pages/client/styled';
import { Icon } from 'antd';
import GeneralTable from '../../components/ClientDetailPage/GeneralTable';

const data = [
  {
    description: 'product A',
    value: 5000,
  },
  {
    description: 'product B',
    value: 3000,
  },
];

class ProposedProduct extends PureComponent {
  public state = {
    loading: false,
  };
  public columns = [
    {
      title: 'Product',
      dataIndex: 'description',
      type: 'text',
      key: '0',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      type: 'number',
      key: '1',
    },
  ];
  private tableName = 'product-optimizer';

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
        <GeneralTable
          loading={loading || false}
          columns={this.columns}
          dataSource={data}
          pagination={false}
          className={`${this.tableName}-table`}
        />
      </TableEntryContainer>
    );
  }
}

export default ProposedProduct;

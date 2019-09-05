import React, { PureComponent } from 'react';
import { Icon, Table } from 'antd';

import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../pages/client/styled';
import { Projections } from '../../components/Icons';
import { ProductProps } from '../../pages/client/productOptimizer/ProductOptimizer';

const data = [
  {
    description: 'Product A',
    value: '10,000',
  },
  {
    description: 'Product B',
    value: '10,000',
  },
  {
    description: 'Product C',
    value: '10,000',
  },
];

class CurrentProduct extends PureComponent<ProductProps> {
  public state = {
    loading: false,
  };
  public columns = [
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
          <Icon component={Projections} style={{ marginRight: 10 }} onClick={this.openDrawer} />
          <Icon type="close-square" style={{ fontSize: '16px' }} />
        </>
      ),
      width: 60,
    },
  ];
  private tableName = 'current-product';

  public handleAdd = () => {
    console.log('add new current product');
  }

  public openDrawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  }

  public render() {
    const { loading } = this.state;

    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle small={true}>Current</TextTitle>
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

export default CurrentProduct;

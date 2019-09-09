import React, { PureComponent } from 'react';
import { Icon, Table } from 'antd';

import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../pages/client/styled';
import { Projections } from '../../components/Icons';
import { ProductProps } from '../../pages/client/productOptimizer/ProductOptimizer';

interface CurrentProductState {
  loading: boolean;
  dataList: object[];
}

class CurrentProduct extends PureComponent<ProductProps, CurrentProductState> {
  public state = {
    loading: false,
    dataList: [
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
    ],
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
    this.setState(({ dataList }) => ({ dataList: [...dataList, { description: '', value: undefined }] }));
  }

  public openDrawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  }

  public render() {
    const { dataList, loading } = this.state;

    return (
      <TableEntryContainer>
        <HeaderTitleTable>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.handleAdd} />
          <TextTitle small={true}>Current</TextTitle>
        </HeaderTitleTable>
        <Table
          className={`table-general ${this.tableName}-table`}
          columns={this.columns}
          dataSource={dataList}
          pagination={false}
        />
      </TableEntryContainer>
    );
  }
}

export default CurrentProduct;

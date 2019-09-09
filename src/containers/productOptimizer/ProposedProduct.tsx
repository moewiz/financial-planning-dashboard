import React, { PureComponent } from 'react';
import { Icon, Table } from 'antd';

import { TableEntryContainer } from '../../pages/client/styled';
import { Projections } from '../../components/Icons';
import NewProposedProduct from '../../components/ProductOptimizer/NewProposedProduct';
import { ProductProps } from '../../pages/client/productOptimizer/ProductOptimizer';

interface ProposedProductState {
  loading: boolean;
  dataList: object[];
}

class ProposedProduct extends PureComponent<ProductProps, ProposedProductState> {
  public state = {
    loading: false,
    dataList: [
      {
        description: 'New proposed 1',
        value: '10,000',
      },
      {
        description: 'Proposed 2',
        value: '10,000',
        links: [
          {
            id: 1,
            description: 'Product C',
          },
        ],
      },
    ],
  };
  public columns = [
    {
      title: '',
      key: 'link',
      className: 'text-align-center',
      render: (text: any, record: any) => <Icon type="link" style={{ transform: 'rotate(45deg)' }} />,
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
          <Icon component={Projections} style={{ marginRight: 10 }} onClick={() => this.openDrawer(record)} />
          <Icon type="close-square" style={{ fontSize: '16px' }} />
        </>
      ),
      width: 60,
    },
  ];
  private tableName = 'proposed-product';

  public openDrawer = (record: any) => {
    const { openDrawer } = this.props;
    openDrawer(record);
  }

  public onAdd = (product: any) => {
    this.setState(({ dataList: dataList }) => ({ dataList: [...dataList, { description: '', value: undefined }] }));
  }

  public render() {
    const { dataList } = this.state;

    return (
      <TableEntryContainer>
        <NewProposedProduct onAdd={this.onAdd} />
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

export default ProposedProduct;

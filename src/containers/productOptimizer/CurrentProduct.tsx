import React, { PureComponent } from 'react';
import { Icon, Table, Popconfirm } from 'antd';
import cn from 'classnames';

import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../../pages/client/styled';
import { ProductProps } from '../../pages/client/productOptimizer/ProductOptimizer';
import { Projections } from '../../components/Icons';
import { Product } from '../../components/ProductOptimizer/Drawer/DrawerProduct';

interface CurrentProductState {
  loading: boolean;
  dataList: Product[];
}

class CurrentProduct extends PureComponent<ProductProps, CurrentProductState> {
  public state = {
    loading: false,
    dataList: [
      {
        id: 1,
        description: 'Product A',
        value: '10,000',
      },
      {
        id: 2,
        description: 'Product B',
        value: '10,000',
      },
      {
        id: 3,
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
      render: (text: any, record: any) => {
        const isDisable = !record || !record.id;
        return (
          <>
            <Icon
              className={cn('projection', { disabled: isDisable })}
              component={Projections}
              onClick={() => !isDisable && this.openDrawer()}
            />
            {isDisable ? (
              <Icon className={'remove disabled'} type="close-square" />
            ) : (
              <Popconfirm title="Really delete?" onConfirm={() => this.onRemove(record)}>
                <Icon className="remove" type="close-square" />
              </Popconfirm>
            )}
          </>
        );
      },
      width: 60,
    },
  ];
  private tableName = 'current-product';

  public handleAdd = () => {
    this.setState(({ dataList }) => ({ dataList: [...dataList, { description: '', value: '' }] }));
  }

  public openDrawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  }

  public onRemove = (record: any) => {
    if (record && record.id) {
      this.setState(({ dataList }) => ({ dataList: dataList.filter(({ id }) => id !== record.id) }));
    }
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

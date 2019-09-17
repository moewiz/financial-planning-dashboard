import React from 'react';
import { Table } from 'antd';

import { TableEntryContainer } from '../../../pages/client/styled';
import { ActionDrawerGeneral } from '../../StrategyPage/Drawer/styled';
import CustomSearch from './CustomSearch';
import { Option, Product } from './DrawerProduct';

interface FundTableProps {
  columns: any[];
  data: object[];
  product?: Product;
}

const FundTable = ({ columns, data, product }: FundTableProps) => {
  const total = {
    name: 'Total',
    value: '10,000',
    percentage: '100%',
  };
  const onSelectProduct = (productStringObj: string) => {
    const option: Option = JSON.parse(productStringObj);
    if (option && option.name) {
      // this.setState({ title: option.name });
      console.log('select product', option);
    }
  };
  const onSelectFund = (fundStringObj: string) => {
    const option: Option = JSON.parse(fundStringObj);
    if (option && option.name) {
      // this.setState({ title: option.name });
      console.log('select fund', option);
    }
  };
  const detailProduct = product && product.details && product.details.product;

  return (
    <>
      <ActionDrawerGeneral drawer>
        <CustomSearch placeholder="Add Product" onSelect={onSelectProduct} selectedOption={detailProduct} />
        <CustomSearch placeholder="Search Fund" type="fund" onSelect={onSelectFund} />
      </ActionDrawerGeneral>
      <TableEntryContainer drawer>
        <Table
          className="table-general drawer-fund-table"
          columns={columns}
          dataSource={[...data, total]}
          pagination={false}
        />
      </TableEntryContainer>
    </>
  );
};

export default FundTable;

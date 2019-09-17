import React from 'react';
import { Table } from 'antd';

import { TableEntryContainer } from '../../../pages/client/styled';
import { ActionDrawerGeneral } from '../../StrategyPage/Drawer/styled';
import CustomSearch from './CustomSearch';
import { Option, Product } from './DrawerProduct';

interface FundTableProps {
  columns: any[];
  data: object[];
  setFieldValue: (field: string, value: any) => void;
  product?: Product;
}

const total = {
  name: 'Total',
  value: '10,000',
  percentage: '100%',
};

const FundTable = (props: FundTableProps) => {
  const { columns, data, product, setFieldValue } = props;
  const onSelectProduct = (option: Option) => {
    if (option) {
      setFieldValue('details.product', option);
    }
  };
  const onSelectFund = (option: Option) => {
    if (option) {
      setFieldValue('', option);
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

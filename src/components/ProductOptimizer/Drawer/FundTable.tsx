import React from 'react';
import { Table } from 'antd';
import { get } from 'lodash';

import { TableEntryContainer } from '../../../pages/client/styled';
import { ActionDrawerGeneral } from '../../StrategyPage/Drawer/styled';
import CustomSearch from './CustomSearch';
import { Option, Product } from './DrawerProduct';

interface FundTableProps {
  columns: any[];
  data: object[];
  setFieldValue: (field: string, value: any) => void;
  values?: Product;
}

const total = {
  name: 'Total',
  value: '10,000',
  percentage: '100%',
};

const FundTable = (props: FundTableProps) => {
  const { columns, data, values, setFieldValue } = props;
  const onSelectProduct = (option: Option) => {
    if (option) {
      setFieldValue('details.product', option);
    }
  };
  const onSelectFund = (option: Option) => {
    const funds = get(values, 'details.funds', []);
    if (option) {
      setFieldValue('details.funds', [option, ...funds]);
    }
  };
  const detailProduct = values && values.details && values.details.product;

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

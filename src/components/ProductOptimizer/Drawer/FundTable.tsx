import React from 'react';
import { Table } from 'antd';

import { TableEntryContainer } from '../../../pages/client/styled';

interface FundTableProps {
  columns: any[];
  data: object[];
}

const FundTable = ({ columns, data }: FundTableProps) => {
  const total = {
    name: 'Total',
    value: '10,000',
    percentage: '100%',
  };
  return (
    <TableEntryContainer drawer>
      <Table
        className="table-general drawer-fund-table"
        columns={columns}
        dataSource={[...data, total]}
        pagination={false}
      />
    </TableEntryContainer>
  );
};

export default FundTable;

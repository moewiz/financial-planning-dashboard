import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { get } from 'lodash';

import { TableEntryContainer } from '../../../pages/client/styled';
import { ActionDrawerGeneral } from '../../StrategyPage/Drawer/styled';
import CustomSearch from './CustomSearch';
import { Option, Product } from './DrawerProduct';

interface FundTableProps {
  columns: any[];
  setFieldValue: (field: string, value: any) => void;
  values?: Product;
  parentField?: string;
}

const FundTable = (props: FundTableProps) => {
  const { columns, values, setFieldValue, parentField } = props;
  const funds = get(values, 'details.funds', []);
  const [tableData, setTableData] = useState<Option[]>([]);
  const onSelectProduct = (option: Option) => {
    if (option) {
      const field = (parentField ? parentField + '.' : '') + 'details.product';
      setFieldValue(field, option);
    }
  };
  const onSelectFund = (option: Option) => {
    if (option) {
      const field = (parentField ? parentField + '.' : '') + 'details.funds';
      setFieldValue(field, [option, ...funds]);
    }
  };
  const detailProduct = values && values.details && values.details.product;
  const calculateDataList = useCallback((dataList: Option[]) => {
    const sum = dataList.reduce((acc, data) => (acc += data.value ? data.value : 0), 0);
    const fundsWithPercentage = dataList.map((data: Option) => {
      if (data && data.value) {
        return { ...data, percentage: ((data.value / sum) * 100).toFixed() };
      }
      return data;
    });
    fundsWithPercentage.push({ name: 'Total', value: sum, percentage: 100 });
    setTableData(fundsWithPercentage);
  }, []);
  useEffect(() => {
    calculateDataList(funds);
  }, [get(values, 'details.funds')]);

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
          dataSource={tableData}
          pagination={false}
        />
      </TableEntryContainer>
    </>
  );
};

export default FundTable;

import React, { useCallback, useEffect, useState } from 'react';
import { Icon, Popconfirm, Table } from 'antd';
import { get } from 'lodash';
import cn from 'classnames';
import { FieldArray, FieldArrayRenderProps } from 'formik';

import { TableEntryContainer } from '../../../pages/client/styled';
import { ActionDrawerGeneral, ProposedBlock } from '../../StrategyPage/Drawer/styled';
import CustomSearch from './CustomSearch';
import { Option, Product } from './DrawerProduct';

interface FundTableProps {
  columns: any[];
  setFieldValue: (field: string, value: any) => void;
  values?: Product;
  parentField?: string;
  linkedProduct?: boolean;
}

const FundTable = (props: FundTableProps) => {
  const { columns, values, setFieldValue, parentField, linkedProduct } = props;
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
    fundsWithPercentage.push({ id: -1, name: 'Total', value: sum, percentage: 100 });
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
      {
        linkedProduct && (
          <>
            { parentField ?
              <ProposedBlock>
                <small>{detailProduct && detailProduct.name}</small>
              </ProposedBlock> :
              <ProposedBlock>
                <small>Proposed</small>
              </ProposedBlock>
            }
          </>
        )
      }
      <TableEntryContainer drawer linkedProduct={linkedProduct}>
        <FieldArray
          name={(parentField ? parentField + '.' : '') + 'details.funds'}
          validateOnChange={false}
          render={(fieldArrayRenderProps: FieldArrayRenderProps) => {
            const getColumns = () => {
              return columns.map((col) => {
                if (col.dataIndex === 'remove') {
                  return {
                    ...col,
                    render: (text: any, record: any, index: number) => {
                      if (record && record.id !== -1) {
                        return (
                          <Popconfirm
                            title="Really delete?"
                            onConfirm={() => {
                              fieldArrayRenderProps.remove(index);
                            }}
                          >
                            <Icon type="close-square" theme="twoTone" style={{ fontSize: '16px' }} />
                          </Popconfirm>
                        );
                      }
                      return null;
                    },
                  };
                }
                return col;
              });
            };

            return (
              <Table
                className={cn('table-general drawer-fund-table', { 'linked-product': linkedProduct })}
                columns={getColumns()}
                dataSource={tableData}
                pagination={false}
              />
            );
          }}
        />
      </TableEntryContainer>
    </>
  );
};

export default FundTable;

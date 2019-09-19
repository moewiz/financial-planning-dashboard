import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Icon, Popconfirm, Table } from 'antd';
import { get, isFunction, isNumber } from 'lodash';
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
  fieldArrayLinks?: FieldArrayRenderProps;
  linkIndex?: number;
}

const LinkProductAndFund = (props: FundTableProps) => {
  const { columns, values, setFieldValue, parentField, linkedProduct, fieldArrayLinks, linkIndex } = props;
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
      {linkedProduct && (
        <ProposedBlock>
          {parentField ? (
            <>
              <div className="proposed-title">
                <span className="proposed-title--text">{detailProduct && detailProduct.name}</span>
                <Popconfirm
                  title="Really delete?"
                  onConfirm={() => {
                    if (
                      fieldArrayLinks &&
                      isFunction(fieldArrayLinks.remove) &&
                      isNumber(linkIndex) &&
                      linkIndex > -1
                    ) {
                      fieldArrayLinks.remove(linkIndex);
                    }
                  }}
                >
                  <Icon type="close-square" theme="twoTone" style={{ fontSize: '22px' }} />
                </Popconfirm>
              </div>
              <Checkbox onChange={() => {}}>RoP Alternative</Checkbox>
            </>
          ) : (
            <div className="proposed-title">
              <span className="proposed-title--text">Proposed</span>
            </div>
          )}
        </ProposedBlock>
      )}
      <TableEntryContainer drawer linkedProduct={linkedProduct}>
        <FieldArray
          name={(parentField ? parentField + '.' : '') + 'details.funds'}
          validateOnChange={false}
          render={(fieldArrayFunds: FieldArrayRenderProps) => {
            const getColumns = () => {
              return columns.map((col) => {
                if (col.dataIndex === 'remove') {
                  return {
                    ...col,
                    render: (text: any, record: any, fundIndex: number) => {
                      if (record && record.id !== -1) {
                        return (
                          <Popconfirm
                            title="Really delete?"
                            onConfirm={() => {
                              fieldArrayFunds.remove(fundIndex);
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

export default LinkProductAndFund;

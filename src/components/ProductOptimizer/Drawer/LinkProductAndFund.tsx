import React, { useCallback, useEffect } from 'react';
import { Checkbox, Icon, Popconfirm, Table } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { get, isFunction, isNumber, dropRight, last } from 'lodash';
import cn from 'classnames';
import { FieldArray, FieldArrayRenderProps } from 'formik';

import { TableEntryContainer } from '../../../pages/client/styled';
import { ActionDrawerGeneral, ProposedBlock } from '../../StrategyPage/Drawer/styled';
import { components } from '../../../containers/productOptimizer/CurrentProduct';
import CustomSearch from './CustomSearch';
import { addPercentage, getSumFunds, Option, Product } from './DrawerProduct';

interface FundTableProps {
  columns: any[];
  setFieldValue: (field: string, value: any) => void;
  values?: Product;
  prefixField?: string;
  linkedProduct?: boolean;
  hasCurrent?: boolean;
  fieldArrayLinks?: FieldArrayRenderProps;
  linkIndex?: number;
}

const LinkProductAndFund = (props: FundTableProps) => {
  const { columns, values, setFieldValue, prefixField, linkedProduct, fieldArrayLinks, linkIndex, hasCurrent } = props;
  const funds: Option[] = get(values, 'details.funds', []);
  const onSelectProduct = (option: Option) => {
    if (option) {
      const field = (prefixField ? prefixField + '.' : '') + 'details.product';
      setFieldValue(field, option);
    }
  };
  const onSelectFund = (fieldArrayFunds: FieldArrayRenderProps) => (option: Option) => {
    if (option) {
      const shouldAddTotalRow = funds.length === 0;
      fieldArrayFunds.unshift(option);
      if (shouldAddTotalRow) {
        fieldArrayFunds.push({ id: -1, name: 'Total', value: option.value, percentage: 100 });
      }
    }
  };
  const detailProduct = values && values.details && values.details.product;
  const toggleRoPAlternative = useCallback(
    (e: CheckboxChangeEvent) => {
      const checked = e.target.checked;
      const field = (prefixField ? prefixField + '.' : '') + 'alternative';
      setFieldValue(field, checked);
    },
    [linkIndex],
  );

  useEffect(() => {
    if (funds.length > 0) {
      const fieldName = (prefixField ? prefixField + '.' : '') + 'details.funds';
      const fundsWithoutTotal = dropRight(funds);
      const updatedFunds = addPercentage(fundsWithoutTotal);
      const sum = getSumFunds(fundsWithoutTotal);
      const total = funds[funds.length - 1];
      total.value = sum;

      setFieldValue(fieldName, [...updatedFunds, total]);
    }
  }, [get(values, 'details.funds.length')]);

  return (
    <>
      <FieldArray
        name={(prefixField ? prefixField + '.' : '') + 'details.funds'}
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
                            if (funds.length === 2 && funds[1].id === -1) {
                              fieldArrayFunds.remove(1);
                            }
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
            <>
              <ActionDrawerGeneral drawer>
                <CustomSearch placeholder="Add Product" onSelect={onSelectProduct} selectedOption={detailProduct} />
                <CustomSearch placeholder="Search Fund" type="fund" onSelect={onSelectFund(fieldArrayFunds)} />
              </ActionDrawerGeneral>
              {linkedProduct && (
                <ProposedBlock>
                  {prefixField ? (
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
                      {hasCurrent ? (
                        <span>{values && values.isCurrent ? 'RoP Current' : 'RoP Alternative'}</span>
                      ) : (
                        <Checkbox onChange={toggleRoPAlternative} checked={values && values.alternative}>
                          {values && values.isCurrent ? 'RoP Current' : 'RoP Alternative'}
                        </Checkbox>
                      )}
                    </>
                  ) : (
                    <div className="proposed-title">
                      <span className="proposed-title--text">Proposed</span>
                    </div>
                  )}
                </ProposedBlock>
              )}
              <TableEntryContainer drawer linkedProduct={linkedProduct}>
                <Table
                  className={cn('table-general drawer-fund-table', { 'linked-product': linkedProduct })}
                  columns={getColumns()}
                  dataSource={funds}
                  pagination={false}
                  components={components}
                />
              </TableEntryContainer>
            </>
          );
        }}
      />
    </>
  );
};

export default LinkProductAndFund;

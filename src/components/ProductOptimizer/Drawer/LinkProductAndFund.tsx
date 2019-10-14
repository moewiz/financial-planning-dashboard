import React, { useCallback, useEffect } from 'react';
import { Checkbox, Icon, Popconfirm, Table } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { get, isFunction, isNumber, dropRight, head } from 'lodash';
import cn from 'classnames';
import { FieldArray, FieldArrayRenderProps } from 'formik';

import { TableEntryContainer } from '../../../pages/client/styled';
import { ActionDrawerGeneral, ProposedBlock } from '../../StrategyPage/Drawer/styled';
import { components } from '../../../containers/productOptimizer/CurrentProduct';
import CustomSearch, { CustomSearchProp, CustomSearchType } from './CustomSearch';
import { addPercentage, getSumFunds, Option, Product } from './DrawerProduct';

const fundOptions = [
  {
    id: 1,
    name: 'Solaris W/S Core Aust Equity',
    value: 16000,
  },
  {
    id: 2,
    name: 'CFS W/S Index Aust Share',
    value: 68000,
  },
  {
    id: 3,
    name: 'Ausbil W/S Aust Emerging Leaders',
    value: 12000,
  },
  {
    id: 4,
    name: 'MFS W/S Global Equity',
    value: 20000,
  },
  {
    id: 5,
    name: 'CFS W/S Global Share Index',
    value: 56000,
  },
  {
    id: 6,
    name: 'CFS W/S - Index Global Share (H)',
    value: 40000,
  },
  {
    id: 7,
    name: 'Pendal W/S Global Emerging Market Opportunities',
    value: 12000,
  },
  {
    id: 8,
    name: 'CFS W/S Global Property Securities',
    value: 16000,
  },
  {
    id: 9,
    name: 'CFS W/S Global Listed Infrast. Secs',
    value: 20000,
  },
  {
    id: 10,
    name: 'Schroder W/S Real Return',
    value: 18000,
  },
  {
    id: 11,
    name: 'Schroder W/S Real Return',
    value: 18000,
  },
  {
    id: 12,
    name: 'Macquarie W/S Income Opps',
    value: 28000,
  },
  {
    id: 13,
    name: 'Kapstream W/S Absolute Return Income',
    value: 36000,
  },
  {
    id: 14,
    name: 'FirstChoice W/S Fixed Interest',
    value: 16000,
  },
  {
    id: 15,
    name: 'FirstRate Wholesale Saver',
    value: 24000,
  },
];

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
    // const shouldAddTotalRow = funds.length === 0;
    if (option) {
      fieldArrayFunds.unshift(option);
      const field = (prefixField ? prefixField + '.' : '') + fieldArrayFunds.name;
      setFieldValue(field, fundOptions);

      // if (shouldAddTotalRow) {
      //   fieldArrayFunds.push({ id: -1, name: 'Total', value: option.value, percentage: 100 });
      // }
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

  // Update Total row
  useEffect(() => {
    if (funds.length > 0 && funds[0].id !== -1) {
      const fieldName = (prefixField ? prefixField + '.' : '') + 'details.funds';
      const newFunds = funds[funds.length - 1].id !== -1 ? funds : dropRight(funds);
      const updatedFunds = addPercentage(newFunds);
      const sum = getSumFunds(newFunds);
      let totalRow;
      if (funds[funds.length - 1].id !== -1) {
        totalRow = { id: -1, name: 'Total', value: sum, percentage: 100 };
      } else {
        totalRow = funds[funds.length - 1];
        totalRow.value = sum;
      }

      setFieldValue(fieldName, [...updatedFunds, totalRow]);
    }
  }, [get(values, 'details.funds.length')]);
  const selectedOption: Option | undefined =
    get(values, 'details.funds.length') > 1 ? head(get(values, 'details.funds')) : undefined;
  const searchFundProps: CustomSearchProp = {
    placeholder: 'Search Fund',
    type: CustomSearchType.Fund,
  };
  if (selectedOption) {
    searchFundProps.selectedOption = selectedOption;
  }

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
                <CustomSearch
                  placeholder="Add Product"
                  type={CustomSearchType.Product}
                  onSelect={onSelectProduct}
                  selectedOption={detailProduct}
                />
                <CustomSearch onSelect={onSelectFund(fieldArrayFunds)} {...searchFundProps} />
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

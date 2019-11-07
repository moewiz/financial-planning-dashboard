import React from 'react';
import { dropRight, get, isString, last, map } from 'lodash';
import { Button } from 'antd';
import { FieldArray, FieldArrayRenderProps } from 'formik';

import { ActionDrawerGeneral } from '../../StrategyPage/Drawer/styled';
import { addPercentage, getSumFunds, Option, Product } from './DrawerProduct';
import { FundBlock, FundTabContent, HorizontalScrollable } from '../styled';
import LinkProductAndFund from './LinkProductAndFund';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';

interface FundTabProps {
  product: Product;
  setFieldValue: (field: string, value: any) => void;
  isSubmitting: boolean;
  dirty: boolean;
  readOnly?: boolean;
}

interface FundTabStates {
  hovering?: number | string;
}

class FundTab extends React.PureComponent<FundTabProps, FundTabStates> {
  public state = {
    hovering: -1,
  };
  public columns = [
    {
      title: 'Fund Name',
      dataIndex: 'name',
      key: '0',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: '1',
      width: 100,
      className: 'text-align-right investments-bold',
      editable: true,
      dollar: true,
      type: EditCellType.number,
    },
    {
      title: '%',
      dataIndex: 'percentage',
      className: 'text-align-center investments-bold',
      type: EditCellType.number,
      editable: true,
      options: {
        min: 0,
        max: 100,
        formatter: (value: any) => `${value}%`,
        parser: (value: any) => value.replace('%', ''),
      },
      key: '2',
      width: 60,
    },
    {
      title: '',
      dataIndex: 'remove',
      width: 30,
      key: '3',
    },
  ];

  public mouseOver = (id?: number | string) => {
    this.setState({
      hovering: id,
    });
  }

  public mouseOut = (id?: number | string) => {
    this.setState({
      hovering: -1,
    });
  }

  public handleMouseOver = (id?: number | string) => () => {
    this.mouseOver(id);
  }

  public handleMouseOut = (id?: number | string) => () => {
    this.mouseOut(id);
  }

  public getClasses = (id?: number | string) => {
    const { hovering } = this.state;
    const haveHover = hovering !== -1;
    const classname = 'all-proposed';
    if (haveHover) {
      return hovering === id ? 'proposed-active' : 'proposed-inavtive';
    } else {
      return classname;
    }
  }

  public onEdit = (prefixField?: string) => (value: any, name: string, rowIndex: number) => {
    const { setFieldValue, product } = this.props;
    const tableName = prefixField ? `${prefixField}.details.funds` : `details.funds`;
    const fieldName = `${tableName}.${rowIndex}.${name}`;
    setFieldValue(fieldName, value);

    // Side-effects
    const record = get(product, `${tableName}[${rowIndex}]`);
    if (record && record.id === -1) {
      return;
    }

    if (isString(value)) {
      return;
    }

    const funds: Option[] = get(product, tableName, []);
    if (funds && funds.length > 0) {
      value = value > 0 ? value : 0;
      if (name === 'percentage') {
        const totalRow = last(funds);
        if (totalRow && totalRow.value) {
          const newValue = (value * totalRow.value) / 100;
          setFieldValue(`${tableName}.${rowIndex}.value`, newValue);
        }
      } else {
        funds[rowIndex].value = value;
        const fundsWithoutTotal = dropRight(funds);
        const updatedFunds = addPercentage(fundsWithoutTotal);
        const total = funds[funds.length - 1];
        total.value = getSumFunds(fundsWithoutTotal);

        setFieldValue(tableName, [...updatedFunds, total]);
      }
    }
  }

  public getColumns = (prefixField?: string) => {
    const { readOnly } = this.props;

    return this.columns.map((col) => {
      if (col.editable) {
        return {
          ...col,
          onCell: (record: any, rowIndex: number) => ({
            ...col,
            readOnly,
            record,
            rowIndex,
            type: col.type || 'text',
            onEdit: this.onEdit(prefixField),
          }),
        };
      }

      return col;
    });
  }

  public render() {
    const { product, setFieldValue, isSubmitting, dirty, readOnly } = this.props;

    return (
      <>
        <FundTabContent>
          <FundBlock
            className={this.getClasses(-2)}
            onMouseOver={this.handleMouseOver(-2)}
            onMouseOut={this.handleMouseOut(-2)}
          >
            <LinkProductAndFund
              columns={this.getColumns()}
              values={product}
              setFieldValue={setFieldValue}
              linkedProduct={true}
              readOnly={readOnly}
            />
          </FundBlock>
          <HorizontalScrollable>
            {product && (
              <FieldArray
                name={'links'}
                render={(fieldArrayRenderProps: FieldArrayRenderProps) => {
                  return map(product.links, (linkedProduct: Product, index: number) => {
                    const prefixField = `links.${index}`;

                    return (
                      <FundBlock
                        className={this.getClasses(linkedProduct.id)}
                        key={linkedProduct.id}
                        onMouseOver={this.handleMouseOver(linkedProduct.id)}
                        onMouseOut={this.handleMouseOut(linkedProduct.id)}
                      >
                        <LinkProductAndFund
                          columns={this.getColumns(prefixField)}
                          values={linkedProduct}
                          setFieldValue={setFieldValue}
                          prefixField={prefixField}
                          linkedProduct={true}
                          fieldArrayLinks={fieldArrayRenderProps}
                          linkIndex={index}
                          hasCurrent={product.hasCurrent}
                          readOnly={readOnly}
                        />
                      </FundBlock>
                    );
                  });
                }}
              />
            )}
          </HorizontalScrollable>
        </FundTabContent>

        {!readOnly && (
          <ActionDrawerGeneral visible>
            <Button htmlType={'button'} type={'default'}>
              <span>Add comparison product</span>
            </Button>
            <Button htmlType={'submit'} type={'primary'} disabled={isSubmitting || !dirty}>
              <span>Save</span>
            </Button>
          </ActionDrawerGeneral>
        )}
      </>
    );
  }
}

export default FundTab;

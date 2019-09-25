import React from 'react';
import { map, get, last, isString, dropRight } from 'lodash';
import { Button } from 'antd';
import { FieldArray, FieldArrayRenderProps } from 'formik';

import { ActionDrawerGeneral } from '../../StrategyPage/Drawer/styled';
import {addPercentage, getSumFunds, Option, Product} from './DrawerProduct';
import { FundBlock, FundTabContent, HorizontalScrollable } from '../styled';
import LinkProductAndFund from './LinkProductAndFund';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';

interface FundTabProps {
  product: Product;
  setFieldValue: (field: string, value: any) => void;
  isSubmitting: boolean;
  dirty: boolean;
}

interface FundTabStates {
  hovering?: number;
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
      className: 'text-align-center',
      editable: true,
      type: EditCellType.number,
    },
    {
      title: '%',
      dataIndex: 'percentage',
      className: 'text-align-center',
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

  public mouseOver = (id?: number) => {
    this.setState({
      hovering: id,
    });
  }

  public mouseOut = (id?: number) => {
    this.setState({
      hovering: -1,
    });
  }

  public handleMouseOver = (id?: number) => () => {
    this.mouseOver(id);
  }

  public handleMouseOut = (id?: number) => () => {
    this.mouseOut(id);
  }

  public getClasses = (id?: number) => {
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
        const sum = getSumFunds(fundsWithoutTotal);
        total.value = sum;

        setFieldValue(tableName, [...updatedFunds, total]);
      }
    }
  }

  public getColumns = (prefixField?: string) => {
    return this.columns.map((col) => {
      if (col.editable) {
        return {
          ...col,
          onCell: (record: any, rowIndex: number) => ({
            ...col,
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
    const { product, setFieldValue, isSubmitting, dirty } = this.props;

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
                        />
                      </FundBlock>
                    );
                  });
                }}
              />
            )}
          </HorizontalScrollable>
        </FundTabContent>

        <ActionDrawerGeneral visible>
          <Button htmlType={'button'} type={'default'}>
            <span>Add comparison product</span>
          </Button>
          <Button htmlType={'submit'} type={'primary'} disabled={isSubmitting || !dirty}>
            <span>Save</span>
          </Button>
        </ActionDrawerGeneral>
      </>
    );
  }
}

export default FundTab;

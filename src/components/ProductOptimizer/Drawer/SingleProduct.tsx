import React, { PureComponent } from 'react';
import { get } from 'lodash';
import { Button } from 'antd';

import { Product } from './DrawerProduct';
import LinkProductAndFund from './LinkProductAndFund';
import { DrawerProductWrapper } from '../styled';
import { ActionDrawerGeneral, DrawerTitle } from '../../StrategyPage/Drawer/styled';
import { EditCellType } from '../../StrategyPage/Drawer/EditCell';

interface SingleProductProps {
  values: Product;
  setFieldValue: (field: string, value: any) => void;
  isSubmitting: boolean;
  dirty: boolean;
}

class SingleProduct extends PureComponent<SingleProductProps> {
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
      className: 'text-align-center',
      editable: true,
      type: EditCellType.number,
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      className: 'text-align-center',
      editable: true,
      type: EditCellType.number,
      options: {
        min: 0,
        max: 100,
        formatter: (value: any) => `${value}%`,
        parser: (value: any) => value.replace('%', ''),
      },
      key: '2',
    },
  ];
  public onEdit = (value: any, name: string, rowIndex: number) => {
    const { setFieldValue } = this.props;
    const fieldName = `details.funds.${rowIndex}.${name}`;
    setFieldValue(fieldName, value);
  }
  public getColumns = () => {
    return this.columns.map((col) => {
      if (col.editable) {
        return {
          ...col,
          onCell: (record: any, rowIndex: number) => ({
            ...col,
            record,
            rowIndex,
            type: col.type || 'text',
            onEdit: this.onEdit,
          }),
        };
      }

      return col;
    });
  }

  public render() {
    const { values, setFieldValue, isSubmitting, dirty } = this.props;
    return (
      <DrawerProductWrapper>
        <DrawerTitle>{get(values.details, 'product.name', 'My Product')}</DrawerTitle>

        <LinkProductAndFund columns={this.getColumns()} values={values} setFieldValue={setFieldValue} />

        <ActionDrawerGeneral visible>
          <Button htmlType={'submit'} type={'primary'} disabled={isSubmitting || !dirty}>
            <span>Save</span>
          </Button>
        </ActionDrawerGeneral>
      </DrawerProductWrapper>
    );
  }
}

export default SingleProduct;

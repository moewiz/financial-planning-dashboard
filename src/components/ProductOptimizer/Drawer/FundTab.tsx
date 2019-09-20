import React from 'react';
import { map } from 'lodash';
import { Button } from 'antd';
import { FieldArray, FieldArrayRenderProps } from 'formik';

import { ActionDrawerGeneral } from '../../StrategyPage/Drawer/styled';
import { Product } from './DrawerProduct';
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

  public onEdit = (value: any, name: string, rowIndex: number) => {
    console.log({ value, name, rowIndex });
    // const { fieldArrayRenderProps, dataList } = this.props;
    // const rowName = `${fieldArrayRenderProps.name}[${rowIndex}]`;
    // const fieldName = `${rowName}.${name}`;
    // fieldArrayRenderProps.form.setFieldValue(fieldName, value);
    //
    // const record = dataList[rowIndex];
    // const remainingFieldName = name === 'description' ? 'value' : 'description';
    // if (record && !record.id && value && record[remainingFieldName]) {
    //   const id = uuidv1();
    //   fieldArrayRenderProps.form.setFieldValue(`${rowName}.id`, id);
    //   setTimeout(() => {
    //     this.handleAdd();
    //   }, 10);
    // }
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
            // dataIndex: 'test-' + rowIndex + col.dataIndex,
            type: col.type || 'text',
            onEdit: this.onEdit,
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
                    return (
                      <FundBlock
                        className={this.getClasses(linkedProduct.id)}
                        key={linkedProduct.id}
                        // onMouseOver={this.handleMouseOver(linkedProduct.id)}
                        // onMouseOut={this.handleMouseOut(linkedProduct.id)}
                      >
                        <LinkProductAndFund
                          columns={this.getColumns()}
                          values={linkedProduct}
                          setFieldValue={setFieldValue}
                          prefixField={`links.${index}`}
                          linkedProduct={true}
                          fieldArrayLinks={fieldArrayRenderProps}
                          linkIndex={index}
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

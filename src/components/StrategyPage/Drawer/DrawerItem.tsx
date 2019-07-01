import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { map, get, isNumber } from 'lodash';
import { Collapse, Icon, Tooltip } from 'antd';
import EditCell, { EditCellType } from './EditCell';
import {
  DrawerTableRows,
  DrawerRowTitle,
  DrawerTableParent,
  DrawerTableList,
  DrawerTableListItems,
  DrawerRowSubTitle,
} from './styled';
const { Panel } = Collapse;

export interface RowData {
  key: string;
  title: string;
  values?: Array<string | number>;
  tooltip?: string;
  editable?: boolean;
  children?: RowData[];

  [key: string]: any;
}

interface DrawerItemProps {
  columns: string[];
  row: RowData;
}

class DrawerItem extends PureComponent<DrawerItemProps> {
  public renderValues = (values: any[], editable?: boolean) => {
    const { columns } = this.props;

    if (editable) {
      return map(columns, (column: string, index: number) => {
        const value = get(values, [index], '');
        const type = isNumber(value) ? EditCellType.number : EditCellType.number;

        return (
          <EditCell name={`${index}`} key={index} onChange={(val: any) => console.log(val)} value={value} type={type} />
        );
      });
    } else {
      return map(columns, (column: string, index: number) => {
        const value = get(values, [index], '');
        return (
          <span className={'cell'} key={index}>
            {value}
          </span>
        );
      });
    }
  }

  public renderChild = (innerRow: RowData, index: string) => {
    return (
      <React.Fragment key={index}>
        <DrawerTableListItems className={classNames({ 'bold-text': innerRow.editable })} key={index}>
          {innerRow.tooltip ? (
            <Tooltip title={innerRow.tooltip}>
              <DrawerRowSubTitle>{innerRow.title}</DrawerRowSubTitle>
            </Tooltip>
          ) : (
            <DrawerRowSubTitle>{innerRow.title}</DrawerRowSubTitle>
          )}
          {innerRow.values && <div className="values">{this.renderValues(innerRow.values, innerRow.editable)}</div>}
        </DrawerTableListItems>
        {innerRow.children && innerRow.children.length > 0 && (
          <DrawerTableList>{map(innerRow.children, this.renderChild)}</DrawerTableList>
        )}
      </React.Fragment>
    );
  }

  public render() {
    const { row } = this.props;

    return (
      <DrawerTableRows>
        {row.values ? (
          <DrawerTableParent>
            {row.tooltip ? (
              <Tooltip title={row.tooltip}>
                <DrawerRowSubTitle>{row.title}</DrawerRowSubTitle>
              </Tooltip>
            ) : (
              <DrawerRowSubTitle>{row.title}</DrawerRowSubTitle>
            )}
            <div className="values">{this.renderValues(row.values, row.editable)}</div>
          </DrawerTableParent>
        ) : (
          <Collapse
            defaultActiveKey={['1']}
            bordered={false}
            expandIcon={(panelProps: any) =>
              panelProps.isActive ? <Icon type="minus-square" /> : <Icon type="plus-square" />
            }
          >
            <Panel header={row.title} key="1">
              {row.children && row.children.length > 0 && (
                <DrawerTableList>{map(row.children, this.renderChild)}</DrawerTableList>
              )}
            </Panel>
          </Collapse>
        )}
      </DrawerTableRows>
    );
  }
}

export default DrawerItem;

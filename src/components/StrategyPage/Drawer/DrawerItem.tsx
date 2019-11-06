import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { map, get, isNumber } from 'lodash';
import numeral from 'numeral';
import { Collapse, Icon, Tooltip } from 'antd';

import EditCell, { EditCellType } from './EditCell';
import { DrawerTableRows, DrawerTableParent, DrawerTableList, DrawerTableListItems, DrawerRowSubTitle } from './styled';
const { Panel } = Collapse;

export interface RowData {
  key: string;
  title: string;
  values?: Array<string | number>;
  tooltip?: string;
  editable?: boolean;
  percent?: boolean;
  children?: RowData[];

  [key: string]: any;
}

interface DrawerItemProps {
  columns: string[];
  row: RowData;
}

interface EditCellContainerProps {
  value: any;
  index: number;
  keyString?: string;
  type: EditCellType;
  extraProps?: any;
}

const EditCellContainer = (props: EditCellContainerProps) => {
  const { index, value: propValue, keyString: key, type, extraProps } = props;
  const [value, setValue] = React.useState<any>(propValue);
  const name = `${key}[${index}]`;

  // tslint:disable-next-line:max-line-length
  return <EditCell name={name} key={index} onChange={(val) => setValue(val)} value={value} type={type} {...extraProps} />;
};

class DrawerItem extends PureComponent<DrawerItemProps> {
  public renderValues = (row: RowData, key?: string) => {
    const { values, editable, percent } = row;
    const { columns } = this.props;

    if (editable) {
      return map(columns, (column: string, index: number) => {
        const value = get(values, [index], '');
        const type = isNumber(value) ? EditCellType.number : EditCellType.text;
        let extraProps = {};
        if (percent) {
          extraProps = {
            options: {
              precision: 2,
              min: 0,
              max: 100,
              formatter: (val: any) => `${val}%`,
              parser: (val: any) => val.replace('%', ''),
            },
          };
        }

        return (
          <EditCellContainer
            key={index}
            keyString={key}
            index={index}
            value={value}
            type={type}
            extraProps={extraProps}
          />
        );
      });
    } else {
      return map(columns, (column: string, index: number) => {
        let value = get(values, [index], 0);
        let format = '$0,0';
        if (percent && isNumber(value)) {
          value /= 100;
          format = '0.00%';
        }
        return (
          <span className={'cell'} key={index}>
            {numeral(value).format(format)}
          </span>
        );
      });
    }
  }

  public renderChild = (row: RowData, index: number, parentKey?: string) => {
    const { key } = row;
    const combinedKey = parentKey ? parentKey + '.' + key : key;

    return (
      <React.Fragment key={index}>
        <DrawerTableListItems className={classNames({ 'bold-text': row.editable })} key={index}>
          {row.tooltip ? (
            <DrawerRowSubTitle>
              <Tooltip title={row.tooltip} placement="topLeft">
                {row.title}
              </Tooltip>
            </DrawerRowSubTitle>
          ) : (
            <DrawerRowSubTitle>{row.title}</DrawerRowSubTitle>
          )}
          {row.values && <div className="values">{this.renderValues(row, combinedKey)}</div>}
        </DrawerTableListItems>
        {row.children && row.children.length > 0 && (
          <DrawerTableList>
            {map(row.children, (innerRow: RowData, idx: number) => this.renderChild(innerRow, idx, combinedKey))}
          </DrawerTableList>
        )}
      </React.Fragment>
    );
  }

  public render() {
    const { row } = this.props;

    if (row.children) {
      return (
        <DrawerTableRows>
          <Collapse
            defaultActiveKey={['1']}
            bordered={false}
            expandIcon={(panelProps: any) =>
              panelProps.isActive ? <Icon type="minus-square" /> : <Icon type="plus-square" />
            }
          >
            <Panel
              header={
                <div className="drawer-parent">
                  {row.tooltip ? (
                    <DrawerRowSubTitle>
                      <Tooltip title={row.tooltip} placement="topLeft">
                        {row.title}
                      </Tooltip>
                    </DrawerRowSubTitle>
                  ) : (
                    <DrawerRowSubTitle>{row.title}</DrawerRowSubTitle>
                  )}
                  {row.values && <div className="values">{this.renderValues(row, row.key)}</div>}
                </div>
              }
              key="1"
            >
              {row.children && row.children.length > 0 && (
                <DrawerTableList>
                  {map(row.children, (innerRow: RowData, index: number) => this.renderChild(innerRow, index, row.key))}
                </DrawerTableList>
              )}
            </Panel>
          </Collapse>
        </DrawerTableRows>
      );
    }

    return (
      <DrawerTableRows>
        <DrawerTableParent>
          {row.tooltip ? (
            <DrawerRowSubTitle>
              <Tooltip title={row.tooltip} placement="topLeft">
                {row.title}
              </Tooltip>
            </DrawerRowSubTitle>
          ) : (
            <DrawerRowSubTitle>{row.title}</DrawerRowSubTitle>
          )}
          <div className="values">{this.renderValues(row, row.key)}</div>
        </DrawerTableParent>
      </DrawerTableRows>
    );
  }
}

export default DrawerItem;

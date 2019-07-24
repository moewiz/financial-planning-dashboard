import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { map, get, isNumber } from 'lodash';
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
}

const EditCellContainer = (props: EditCellContainerProps) => {
  const { index, value: propValue, keyString: key, type } = props;
  const [value, setValue] = React.useState<any>(propValue);
  const name = `${key}[${index}]`;

  return <EditCell name={name} key={index} onChange={(val) => setValue(val)} value={value} type={type} />;
};

class DrawerItem extends PureComponent<DrawerItemProps> {
  public renderValues = (row: RowData, key?: string) => {
    const { values, editable } = row;
    const { columns } = this.props;

    if (editable) {
      return map(columns, (column: string, index: number) => {
        const value = get(values, [index], '');
        const type = isNumber(value) ? EditCellType.number : EditCellType.text;

        return <EditCellContainer key={index} keyString={key} index={index} value={value} type={type} />;
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

    return (
      <DrawerTableRows>
        {row.values ? (
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
                <DrawerTableList>
                  {map(row.children, (innerRow: RowData, index: number) => this.renderChild(innerRow, index, row.key))}
                </DrawerTableList>
              )}
            </Panel>
          </Collapse>
        )}
      </DrawerTableRows>
    );
  }
}

export default DrawerItem;

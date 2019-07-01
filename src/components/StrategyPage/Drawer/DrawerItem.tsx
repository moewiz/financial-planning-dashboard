import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { Collapse, Icon } from 'antd';
import EditCell from './EditCell';
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
  public render() {
    const { columns, row } = this.props;

    return (
      <DrawerTableRows>
        {row.values ? (
          <DrawerTableParent>
            <DrawerRowTitle>{row.title}</DrawerRowTitle>
            <div className="values">
              {map(columns, (column: string, index: number) => (
                <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
              ))}
            </div>
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
              <DrawerTableList>
                <DrawerTableListItems className="bold-text">
                  <DrawerRowSubTitle>Employer Contribution (SG)</DrawerRowSubTitle>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </DrawerTableListItems>
                <DrawerTableListItems className="bold-text">
                  <DrawerRowSubTitle>Salary Sacrifice Contribution</DrawerRowSubTitle>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </DrawerTableListItems>
                <DrawerTableListItems className="bold-text">
                  <DrawerRowSubTitle>Personal Deductible Contribution</DrawerRowSubTitle>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </DrawerTableListItems>
                <DrawerTableListItems className="bold-text">
                  <DrawerRowSubTitle>Non-concessional Contribution</DrawerRowSubTitle>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </DrawerTableListItems>
                <DrawerTableListItems>
                  <DrawerRowSubTitle>Government Co-contribution</DrawerRowSubTitle>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <span className={'cell'} key={index}>
                        0
                      </span>
                    ))}
                  </div>
                </DrawerTableListItems>
                <DrawerTableListItems className="bold-text">
                  <DrawerRowSubTitle>Spouse Contribution</DrawerRowSubTitle>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </DrawerTableListItems>
              </DrawerTableList>
            </Panel>
          </Collapse>
        )}
      </DrawerTableRows>
    );
  }
}

export default DrawerItem;

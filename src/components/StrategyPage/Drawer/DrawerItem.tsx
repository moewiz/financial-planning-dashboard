import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { Collapse, Icon } from 'antd';
import EditCell from './EditCell';
import { DrawerItemStyled } from '../styled';
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
      <DrawerItemStyled className={'drawer-item'}>
        {row.values ? (
          <div className={'parent'}>
            <div className="title">{row.title}</div>
            <div className="values">
              {map(columns, (column: string, index: number) => (
                <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
              ))}
            </div>
          </div>
        ) : (
          <Collapse
            defaultActiveKey={['1']}
            bordered={false}
            expandIcon={(panelProps: any) =>
              panelProps.isActive ? <Icon type="minus-square" /> : <Icon type="plus-square" />
            }
          >
            <Panel header={row.title} key="1">
              <div className="list">
                <div className="item bold-text">
                  <div className="title">Employer Contribution (SG)</div>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </div>
                <div className="item bold-text">
                  <div className="title">Salary Sacrifice Contribution</div>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </div>
                <div className="item bold-text">
                  <div className="title">Personal Deductible Contribution</div>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </div>
                <div className="item bold-text">
                  <div className="title">Non-concessional Contribution</div>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </div>
                <div className="item">
                  <div className="title">Government Co-contribution</div>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <span className={'cell'} key={index}>
                        0
                      </span>
                    ))}
                  </div>
                </div>
                <div className="item bold-text">
                  <div className="title">Spouse Contribution</div>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <EditCell name={`${index}`} key={index} onChange={(value: any) => console.log(value)} value={0} />
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        )}
      </DrawerItemStyled>
    );
  }
}

export default DrawerItem;

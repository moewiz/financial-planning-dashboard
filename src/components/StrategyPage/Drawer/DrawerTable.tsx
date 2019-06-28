import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { DrawerTableWrapper } from '../styled';
import { Icon } from 'antd';
import EditCell from './EditCell';

interface RowData {
  key: string;
  title: string;
  values: Array<string | number>;
  tooltip?: string;
  editable?: boolean;
  children?: RowData[];
}

interface DrawerTableProps {
  tableData: RowData[];
  columns: string[];
}

class DrawerTable extends PureComponent<DrawerTableProps> {
  public render() {
    const { columns } = this.props;
    return (
      <DrawerTableWrapper>
        <div className="columns">
          {map(columns, (column: string, index: number) => (
            <span className={'cell'} key={index}>
              {column}
            </span>
          ))}
        </div>
        <div className={'drawer-item'}>
          <div className={'parent'}>
            <Icon type="minus-square" />
            <div className="title">Opening Value</div>
          </div>
          <div className="list">
            <div className="item">
              <div className="title">Taxable Component</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>
                    0
                  </span>
                ))}
              </div>
            </div>
            <div className="item">
              <div className="title bold-text">Tax Free Component</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>
                      0
                    </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={'drawer-item'}>
          <div className={'parent'}>
            <Icon type="minus-square" />
            <div className="title">Excess Contributions</div>
          </div>
          <div className="list">
            <div className="item">
              <div className="title">Excess non-concessional</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>
                    0
                  </span>
                ))}
              </div>
            </div>
            <div className="list">
              <div className="item bold-text">
                <div className="title">Override</div>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <EditCell
                      name={`${index}`}
                      key={index}
                      onChange={(value: any) => console.log(value)}
                      value={0}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="title">Excess concessional</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>
                    0
                  </span>
                ))}
              </div>
            </div>
            <div className="list">
              <div className="item bold-text">
                <div className="title">Override</div>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>
                      0
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={'drawer-item'}>
          <div className={'parent'}>
            <Icon type="minus-square" />
            <div className="title">Contributions</div>
          </div>
          <div className="list">
            <div className="item bold-text">
              <div className="title">Employer Contribution (SG)</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>
                    0
                  </span>
                ))}
              </div>
            </div>
            <div className="item bold-text">
              <div className="title">Salary Sacrifice Contribution</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>
                    0
                  </span>
                ))}
              </div>
            </div>
            <div className="item bold-text">
              <div className="title">Personal Deductible Contribution</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>
                    0
                  </span>
                ))}
              </div>
            </div>
            <div className="item bold-text">
              <div className="title">Non-concessional Contribution</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>
                    0
                  </span>
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
                  <span className={'cell'} key={index}>
                    0
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-item">
          <div className="parent bold-text">
            <Icon type="plus-square" />
            <div className="title">Closing Value (PV)</div>
            <div className="values">
              {map(columns, (column: string, index: number) => (
                <span className={'cell'} key={index}>
                  0
                </span>
              ))}
            </div>
          </div>
        </div>
      </DrawerTableWrapper>
    );
  }
}

export default DrawerTable;

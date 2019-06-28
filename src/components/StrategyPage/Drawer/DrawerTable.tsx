import React, { PureComponent } from 'react';
import { map } from 'lodash';
// import DrawerItem, { RowData } from './DrawerItem';
import { DrawerTableWrapper, DrawerTableHeader,
  DrawerTableContent, DrawerTableRows, DrawerTableParent,
  DrawerRowTitle, DrawerTableList, DrawerTableListItems,
  DrawerRowSubTitle, DrawerTableSubList,
} from './styled';
import {Icon} from 'antd';

interface RowData {
  key: string;
  title: string;
  values?: Array<string | number>;
  tooltip?: string;
  editable?: boolean;
  children?: RowData[];
}

interface DrawerTableProps {
  rows: RowData[];
  columns: string[];
}

class DrawerTable extends PureComponent<DrawerTableProps> {
  public render() {
    const { columns, rows } = this.props;

    return (
      <DrawerTableWrapper>
        <DrawerTableHeader>
          {map(columns, (column: string, index: number) => (
            <span className={'cell'} key={index}>
              {column}
            </span>
          ))}
        {/* {map(rows, (row: RowData, index: number) => (
          <DrawerItem columns={columns} row={row} key={index} />
        ))} */}
        </DrawerTableHeader>
        <DrawerTableContent>
          <DrawerTableRows>
            <DrawerTableParent>
              <Icon type="minus-square" />
              <DrawerRowTitle>Opening Value</DrawerRowTitle>
            </DrawerTableParent>
            <DrawerTableList>
              <DrawerTableListItems>
                <DrawerRowSubTitle>Taxable Component</DrawerRowSubTitle>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>
                      0
                    </span>
                  ))}
                </div>
              </DrawerTableListItems>
              <DrawerTableListItems>
                <DrawerRowSubTitle>Tax Free Component</DrawerRowSubTitle>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>
                      0
                    </span>
                  ))}
                </div>
              </DrawerTableListItems>
            </DrawerTableList>
          </DrawerTableRows>
          <DrawerTableRows>
            <DrawerTableParent>
              <Icon type="minus-square" />
              <DrawerRowTitle>Excess Contributions</DrawerRowTitle>
            </DrawerTableParent>
            <DrawerTableList>
              <DrawerTableListItems>
                <DrawerRowSubTitle>Excess non-concessional</DrawerRowSubTitle>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>
                      0
                    </span>
                  ))}
                </div>
              </DrawerTableListItems>
              <DrawerTableList className="bold-text">
                <DrawerTableSubList>
                  <DrawerRowSubTitle>Override</DrawerRowSubTitle>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <span className={'cell'} key={index}>
                        0
                      </span>
                    ))}
                  </div>
                </DrawerTableSubList>
              </DrawerTableList>
              <DrawerTableListItems>
                <DrawerRowSubTitle>Excess concessional</DrawerRowSubTitle>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>
                      0
                    </span>
                  ))}
                </div>
              </DrawerTableListItems>
              <DrawerTableList className="bold-text">
                <DrawerTableSubList>
                  <DrawerRowSubTitle>Override</DrawerRowSubTitle>
                  <div className="values">
                    {map(columns, (column: string, index: number) => (
                      <span className={'cell'} key={index}>
                        0
                      </span>
                    ))}
                  </div>
                </DrawerTableSubList>
              </DrawerTableList>
            </DrawerTableList>
          </DrawerTableRows>
          <DrawerTableRows>
            <DrawerTableParent>
              <Icon type="minus-square" />
              <DrawerRowTitle>Contributions</DrawerRowTitle>
            </DrawerTableParent>
            <DrawerTableList>
              <DrawerTableListItems className="bold-text">
                <DrawerRowSubTitle>Employer Contribution (SG)</DrawerRowSubTitle>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>
                      0
                    </span>
                  ))}
                </div>
              </DrawerTableListItems>
              <DrawerTableListItems className="bold-text">
                <DrawerRowSubTitle>Salary Sacrifice Contribution</DrawerRowSubTitle>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>
                      0
                    </span>
                  ))}
                </div>
              </DrawerTableListItems>
              <DrawerTableListItems className="bold-text">
                <DrawerRowSubTitle>Personal Deductible Contribution</DrawerRowSubTitle>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>
                      0
                    </span>
                  ))}
                </div>
              </DrawerTableListItems>
              <DrawerTableListItems className="bold-text">
                <DrawerRowSubTitle>Non-concessional Contribution</DrawerRowSubTitle>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>
                      0
                    </span>
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
                    <span className={'cell'} key={index}>
                      0
                    </span>
                  ))}
                </div>
              </DrawerTableListItems>
            </DrawerTableList>
          </DrawerTableRows>
          <DrawerTableRows>
            <DrawerTableParent>
              <Icon type="plus-square" />
              <DrawerRowTitle>Closing Value (PV)</DrawerRowTitle>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>
                    0
                  </span>
                ))}
              </div>
            </DrawerTableParent>
          </DrawerTableRows>
        </DrawerTableContent>;
      </DrawerTableWrapper >;
    )
  }
}

export default DrawerTable;

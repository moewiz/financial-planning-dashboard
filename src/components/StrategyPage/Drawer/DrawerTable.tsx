import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { DrawerTableWrapper } from '../styled';

const columns = [
  '2019/20',
  '2020/21',
  '2021/22',
  '2022/23',
  '2023/24',
  '2024/25',
  '2025/26',
  '2026/27',
  '2027/28',
  '2028/29',
];

class DrawerTable extends PureComponent {
  public render() {
    return (
      <DrawerTableWrapper>
        <div className="columns">
          {map(columns, (column: string, index: number) => (
            <span className={'cell'} key={index}>{column}</span>
          ))}
        </div>
        <div className={'drawer-item'}>
          <div className={'parent'}>
            <div className="title">Opening Value</div>
          </div>
          <div className="list">
            <div className="item">
              <div className="title bold-text">Taxable Component</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>0</span>
                ))}
              </div>
            </div>
            <div className="item">
              <div className="title bold-text">Tax Free Component</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>0</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={'drawer-item'}>
          <div className={'parent'}>Excess Contributions</div>
          <div className="list">
            <div className="item">
              <div className="title">Excess non-concessional</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>0</span>
                ))}
              </div>
            </div>
            <div className="list">
              <div className="item">
                <div className="title">Override</div>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>0</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="title">Excess concessional</div>
              <div className="values">
                {map(columns, (column: string, index: number) => (
                  <span className={'cell'} key={index}>0</span>
                ))}
              </div>
            </div>
            <div className="list">
              <div className="item">
                <div className="title">Override</div>
                <div className="values">
                  {map(columns, (column: string, index: number) => (
                    <span className={'cell'} key={index}>0</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-item">
          <div className="parent">
            <div className="title">Closing Value (PV)</div>
          </div>
          <div className="values">
            {map(columns, (column: string, index: number) => (
              <span className={'cell'} key={index}>0</span>
            ))}
          </div>
        </div>
      </DrawerTableWrapper>
    );
  }
}

export default DrawerTable;

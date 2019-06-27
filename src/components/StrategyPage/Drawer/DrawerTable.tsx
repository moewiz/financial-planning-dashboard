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
            <span key={index}>{column}</span>
          ))}
        </div>
        <div className={'drawer-item'}>
          <div className={'parent'}>Opening Value</div>
          <div className="list">
            <div className="item">Taxable Component</div>
            <div className="item">Tax Free Component</div>
          </div>
        </div>
        <div className={'drawer-item'}>
          <div className={'parent'}>Excess Contributions</div>
          <div className="list">
            <div className="item">Excess non-concessional </div>
            <div className="list">
              <div className="item">Override</div>
            </div>
            <div className="item">Excess concessional</div>
            <div className="list">
              <div className="item">Override</div>
            </div>
          </div>
        </div>
      </DrawerTableWrapper>
    );
  }
}

export default DrawerTable;

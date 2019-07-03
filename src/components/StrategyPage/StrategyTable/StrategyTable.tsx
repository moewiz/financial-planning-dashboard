import React, { PureComponent } from 'react';
import { Checkbox, Icon, Popconfirm } from 'antd';
import { HeaderTitleTable, TextTitle } from '../../../pages/client/styled';
import { StrategyTypes } from '../../../enums/strategies';

interface StrategyTableProps {
  type: StrategyTypes;
  strategies: object[];
}

class StrategyTable extends PureComponent<StrategyTableProps> {
  public render() {
    const { type } = this.props;

    if (type === StrategyTypes.EstatePlanning) {
      return (
        <>
          <HeaderTitleTable>
            <Icon type={'plus-square'} theme={'filled'} />
            <TextTitle small={true}>Strategy</TextTitle>
            <div>Mark</div>
            <div>Margin</div>
          </HeaderTitleTable>
          <div className="content">
            <div className="items">
              <div className="item-checkbox">
                <Checkbox />
              </div>
              <div className="sentence">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quia?</div>
              <div className="item-checkbox">
                <Checkbox />
              </div>
              <div className="item-checkbox">
                <Checkbox />
              </div>
              <div className="item-export">
                <Icon type="export" />
              </div>
              <div className="item-delete">
                <Popconfirm title="Really delete?" okText="Yes" cancelText="No">
                  <Icon type="close-square" />
                </Popconfirm>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <HeaderTitleTable>
          <Icon type={'plus-square'} theme={'filled'} />
          <TextTitle small={true}>Strategy</TextTitle>
        </HeaderTitleTable>
        <div className="content">
          <div className="items">
            <div className="item-checkbox">
              <Checkbox />
            </div>
            <div className="sentence">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quia?</div>
            <div className="item-export">
              <Icon type="export" />
            </div>
            <div className="item-delete">
              <Popconfirm title="Really delete?" okText="Yes" cancelText="No">
                <Icon type="close-square" />
              </Popconfirm>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StrategyTable;

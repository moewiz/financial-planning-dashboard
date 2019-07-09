import React, { Component } from 'react';
import { Checkbox, Icon, Popconfirm } from 'antd';
import {
  CheckboxCustomize,
  CheckboxCustomizeX,
  StrategyTableIcon,
  StrategyTableIconDel,
  StrategyTableItems,
  StrategyTableText,
} from './styled';

export interface StrategyItemI {
  check: boolean;
  sentence: string;
  values?: any[];
}

interface StrategyItemProps {
  index: number;
  strategy: StrategyItemI;
  removeItem: (index: number) => void;
  mark?: boolean;
  margin?: boolean;
}

class StrategyItem extends Component<StrategyItemProps> {
  public removeItem = () => {
    const { index, removeItem } = this.props;
    removeItem(index);
  }

  public render() {
    const { strategy, mark, margin } = this.props;

    return (
      <StrategyTableItems>
        <CheckboxCustomize>
          <Checkbox checked={strategy.check} />
        </CheckboxCustomize>
        <StrategyTableText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quia?</StrategyTableText>
        {mark && (
          <CheckboxCustomizeX>
            <Checkbox />
          </CheckboxCustomizeX>
        )}
        {margin && (
          <CheckboxCustomizeX>
            <Checkbox />
          </CheckboxCustomizeX>
        )}
        <StrategyTableIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </StrategyTableIcon>
        <StrategyTableIconDel>
          <Popconfirm
            title="Really delete?"
            okText="Yes"
            cancelText="No"
            placement="topRight"
            onConfirm={this.removeItem}
          >
            <Icon type="close-square" />
          </Popconfirm>
        </StrategyTableIconDel>
      </StrategyTableItems>
    );
  }
}

export default StrategyItem;

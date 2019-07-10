import React, { Component } from 'react';
import { isFunction, trim, head, slice, get, replace } from 'lodash';
import { Checkbox, Icon, Popconfirm } from 'antd';
import {
  CheckboxCustomize,
  CheckboxCustomizeX,
  StrategyTableIcon,
  StrategyTableIconDel,
  StrategyTableItems,
  StrategyTableText,
} from './styled';
import { DynamicData } from '../../../reducers/client';
import strategySentences from '../../../enums/strategySentences';

export interface StrategyItemI {
  check: boolean;
  sentence: string;
  values?: any[];
}

interface StrategyItemProps {
  index: number;
  strategy: StrategyItemI;
  removeItem: (index: number) => void;
  client: DynamicData;
  partner: DynamicData;
  mark?: boolean;
  margin?: boolean;
}

export const replaceDynamicValues = (
  text: string,
  values: { context: string; client: DynamicData; partner: DynamicData },
) => {
  const templateSplit = new RegExp(/%([a-z]+)%/g);
  const { context, client, partner } = values;
  return replace(text, templateSplit, (match: string) => {
    if (context === 'client') {
      return get(client, trim(match, '%'));
    }
    if (context === 'partner') {
      return get(partner, trim(match, '%'));
    }
    if (context === 'joint') {
      return get(client, trim(match, '%')) + ' and ' + get(partner, trim(match, '%'));
    }
    return null;
  });
};

class StrategyItem extends Component<StrategyItemProps> {
  public removeItem = () => {
    const { index, removeItem } = this.props;
    removeItem(index);
  }

  public renderCustom = () => {
    const { strategy, client, partner } = this.props;

    return 'Fully customized';
  }

  public renderText = () => {
    const { strategy, client, partner } = this.props;
    const strategySentenceKeys = strategy.sentence.split('.');
    const context = head(strategySentenceKeys);
    const sentenceKey = slice(strategySentenceKeys, 1).join('.');
    const strategySentence = get(strategySentences, sentenceKey);
    if (sentenceKey === 'commenceAccount.fullyCustomized') {
      return this.renderCustom();
    }
    if (context && strategySentence && strategySentence.statement) {
      return replaceDynamicValues(strategySentence.statement, { context, client, partner });
    }
    console.log('missing sentence key for:', sentenceKey);
    return null;
  }

  public render() {
    const { strategy, mark, margin } = this.props;

    return (
      <StrategyTableItems>
        <CheckboxCustomize>
          <Checkbox checked={strategy.check} />
        </CheckboxCustomize>
        <StrategyTableText>{this.renderText()}</StrategyTableText>
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

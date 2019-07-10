import React, { Component } from 'react';
import moment from 'moment';
import { isString, get, head, replace, slice, trim } from 'lodash';
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
import { formatString, Param } from '../StandardText';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { DrawerTableRows } from '../Drawer/styled';

export interface StrategyItemI {
  check: boolean;
  sentence: string;
  values?: any[];
}

interface Sentence {
  statement: string;
  types: EditCellType[];
  options?: any[];
}

interface StrategyItemProps {
  strategyIndex: number;
  strategyType: string;
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
    const { strategyIndex, removeItem } = this.props;
    removeItem(strategyIndex);
  }

  public renderCustom = () => {
    const { strategy, client, partner } = this.props;

    return 'Fully customized';
  }

  public renderText = () => {
    const { strategy, client, partner, strategyType, strategyIndex } = this.props;
    const strategySentenceKeys = strategy.sentence.split('.');
    const context = head(strategySentenceKeys);
    const sentenceKey = slice(strategySentenceKeys, 1).join('.');
    const strategySentence: Sentence = get(strategySentences, sentenceKey);
    if (sentenceKey === 'commenceAccount.fullyCustomized') {
      return this.renderCustom();
    }
    if (context && strategySentence && strategySentence.statement) {
      const stringReplacedByName = replaceDynamicValues(strategySentence.statement, { context, client, partner });
      const values = strategy.values || [];
      return formatString(stringReplacedByName, values, (value: any, index: number) => {
        if (strategySentence.types) {
          const type = strategySentence.types[index];
          let options = get(strategySentence, ['options', index], []);
          const name = `${strategyType}.strategies[${strategyIndex}].values[${index}]`;
          if (type === EditCellType.select) {
            if (isString(options)) {
              if (options !== 'year') {
                if (options[0] === '+') {
                  const option = options.slice(1);
                  options = [...get(client, option), ...get(partner, option)];
                } else {
                  if (context === 'client') {
                    options = get(client, options);
                  }
                  if (context === 'partner') {
                    options = get(partner, options);
                  }
                }
              } else {
                options = [];
                const nowYear = moment().year();
                for (let i = nowYear; i < nowYear + 10; i++) {
                  options.push({ value: i, label: `${i}/${i + 1} Financial Year` });
                }
              }
            }
          }

          return (
            <DrawerTableRows noBorder key={index} className={'strategy-item'}>
              <EditCell
                name={name}
                type={type}
                value={value}
                options={options}
                onChange={(val) => {
                  console.log(val);
                }}
              />
            </DrawerTableRows>
          );
        }
        return <Param key={index}>{value}</Param>;
      });
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

import React, { Component } from 'react';
import moment from 'moment';
import { get, head, isString, map, replace, slice, trim } from 'lodash';
import { Icon, Popconfirm } from 'antd';
import { StrategyTableIcon, StrategyTableIconDel, StrategyTableItems, StrategyTableText } from './styled';
import { DynamicData } from '../../../reducers/client';
import strategySentences from '../../../enums/strategySentences';
import { formatString, Param } from '../StandardText';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { DrawerTableRows, FullyCustomized } from '../Drawer/styled';
import CheckboxInput from '../Drawer/CheckboxInput';

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
  defaultFullValue: any;
  setFieldValue: (field: string, value: any) => void;
}

const getOptions = (context: string, object: { client: any; partner: any }, option: string) => {
  const { client, partner } = object;
  if (context === 'joint') {
    return [...get(client, option), ...get(partner, option)];
  }
  if (context === 'client') {
    return get(client, option);
  }
  if (context === 'partner') {
    return get(partner, option);
  }

  return [];
};

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

  public renderCustom = (context: string) => {
    const { strategy, client, partner, strategyType, strategyIndex } = this.props;
    const options = getOptions(context, { client, partner }, 'superannuation');
    const getName = () => {
      if (context === 'client') {
        return get(client, 'name');
      }
      if (context === 'partner') {
        return get(partner, 'name');
      }
      if (context === 'joint') {
        return get(client, 'name') + ' and ' + get(partner, 'name');
      }
    };

    return (
      <FullyCustomized>
        {getName()}, commence an account based pension in
        <DrawerTableRows noBorder className={'strategy-item'}>
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
            type={EditCellType.date}
            value={get(strategy, 'values[0]')}
            onChange={(val) => {
              console.log(val);
            }}
          />
        </DrawerTableRows>
        <span>
          with <b>{get(strategy, ['values', 1], 0)}</b> from:{' '}
        </span>
        <ul>
          {map(options, (option: { value: any; label: string }, index: number) => (
            <li key={index}>
              {option.label} (
              <DrawerTableRows noBorder key={index} className={'strategy-item'}>
                <EditCell
                  name={`${strategyType}.strategies[${strategyIndex}].values[2][${index}]`}
                  type={EditCellType.number}
                  value={get(strategy, ['values', 2, index])}
                  onChange={(val) => {
                    console.log(val);
                  }}
                  dollar={true}
                  calculateWidth={true}
                />
              </DrawerTableRows>
              )
            </li>
          ))}
        </ul>
        <span>
          Drawdown minimum pension income per month of <b>{get(strategy, ['values', 3], 0)}</b>
        </span>
      </FullyCustomized>
    );
  }

  public renderText = () => {
    const { strategy, client, partner, strategyType, strategyIndex, defaultFullValue } = this.props;
    const strategySentenceKeys = strategy.sentence.split('.');
    const context = head(strategySentenceKeys);
    const sentenceKey = slice(strategySentenceKeys, 1).join('.');
    const strategySentence: Sentence = get(strategySentences, sentenceKey);
    if (context && sentenceKey === 'commenceAccount.fullyCustomized') {
      return this.renderCustom(context);
    }
    if (context && strategySentence && strategySentence.statement) {
      const stringReplacedByName = replaceDynamicValues(strategySentence.statement, { context, client, partner });
      const values = strategy.values || [];
      return formatString(stringReplacedByName, values, (value: any, index: number) => {
        const optionalProps: { [key: string]: any } = {};
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
                optionalProps.yearFi = true;
                options = [];
                const nowYear = moment().year();
                for (let i = nowYear; i < nowYear + 10; i++) {
                  options.push({ value: i, label: `Year ${i}`, renderedLabel: `${i}/${i + 1} Financial Year` });
                }
              }
            }
          }
          if (type === EditCellType.number) {
            optionalProps.dollar = true;
            optionalProps.calculateWidth = true;
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
                defaultFullValue={defaultFullValue}
                {...optionalProps}
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

  public onChangeCheck = (check: boolean) => {
    const { setFieldValue, strategyType, strategyIndex } = this.props;
    const fieldName = `${strategyType}.strategies[${strategyIndex}].check`;

    setFieldValue(fieldName, check);
  }

  public render() {
    const { strategy, mark, margin } = this.props;

    return (
      <StrategyTableItems>
        <CheckboxInput value={strategy.check} onChange={this.onChangeCheck} />
        <StrategyTableText>{this.renderText()}</StrategyTableText>
        {mark && <CheckboxInput value={strategy.check} onChange={(val) => console.log(val)} custom={true} />}
        {margin && <CheckboxInput value={strategy.check} onChange={(val) => console.log(val)} custom={true} />}
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

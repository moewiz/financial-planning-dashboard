import React, { Component } from 'react';
import moment from 'moment';
import { get, head, isString, replace, slice, trim, filter } from 'lodash';
import { Dropdown, Icon, Menu, Popconfirm } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { StrategyTableIcon, StrategyTableItems, StrategyTableText } from './styled';
import { DynamicData } from '../../../reducers/client';
import strategySentences from '../../../enums/strategySentences';
import { formatString, Param } from '../StandardText';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import CheckboxInput from '../Drawer/CheckboxInput';
import CustomizedPension from './CustomizedPension';
import CustomizedInvestment from './CustomizedInvestment';
import CustomizedExistingInvestment from './CustomizedExistingInvestment';
import CustomizedWithdrawFunds from './CustomizedWithdrawFunds';
import { StrategyTypes } from '../../../enums/strategies';
import CustomizedFuneralBond from './CustomizedFuneralBond';

export interface StrategyItemI {
  id?: string;
  check: boolean;
  sentence: string;
  values?: any[];
  mark?: boolean;
  margin?: boolean;
  customNote?: string;
}

interface Sentence {
  statement: string;
  types: EditCellType[];
  options?: any[];
  custom?: boolean;
}

export interface StrategyItemProps {
  strategyIndex: number;
  strategyType: string;
  strategy: StrategyItemI;
  removeItem: (index: number) => void;
  redrawGraphs: () => void;
  client: DynamicData;
  partner: DynamicData;
  mark?: boolean;
  margin?: boolean;
  defaultFullValue: any;
  setFieldValue: (field: string, value: any) => void;
}

export const getOptions = (context: string, object: { client: any; partner: any }, option: string) => {
  const { client, partner } = object;
  if (context === 'joint') {
    return [...get(client, option, []), ...get(partner, option, [])];
  }
  if (context === 'client') {
    return get(client, option, []);
  }
  if (context === 'partner') {
    return get(partner, option, []);
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

const Projections = () => (
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
);

class StrategyItem extends Component<StrategyItemProps> {
  public removeItem = () => {
    const { strategy, strategyIndex, removeItem, setFieldValue, redrawGraphs } = this.props;
    const strategySentenceKeys = strategy.sentence.split('.');
    const context = head(strategySentenceKeys);
    if (context && strategy.id) {
      const sentenceKey = slice(strategySentenceKeys, 1).join('.');
      const remove = (key = 'superannuation') => {
        const newValues = filter(get(this.props, [context, key], []), ({ id }) => id !== strategy.id);
        setFieldValue(`${context}.${key}`, newValues);
      };
      // remove superannuation from the <list of current superannuation accounts>
      const superannuationAccounts = ['commenceAccount', 'commenceTransition'];
      if (superannuationAccounts.includes(sentenceKey)) {
        remove('superannuation');
      }
      // remove investment from the <list of JOINT investment accounts>
      const investmentAccounts = ['newInvestment'];
      if (investmentAccounts.includes(sentenceKey)) {
        remove('investments');
      }
    }
    removeItem(strategyIndex);
    redrawGraphs();
  }

  public handleMenuClick: (param: ClickParam) => void = (e) => {
    if (e && e.key === '3') {
      // add Custom note to the current row.
      const { strategy, setFieldValue, strategyIndex, strategyType } = this.props;
      if (typeof strategy.customNote === 'undefined') {
        const customNoteName = `${strategyType}.strategies[${strategyIndex}].customNote`;
        setFieldValue(customNoteName, '');
      }
    }
  }

  public renderCustom = (context: string, sentenceKey: string) => {
    const { client, partner, defaultFullValue } = this.props;
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
      return '';
    };

    switch (sentenceKey) {
      case 'commenceAccount':
      case 'commenceTransition': {
        return (
          <CustomizedPension
            {...this.props}
            name={getName()}
            context={context}
            sentenceKey={sentenceKey}
            defaultFullValue={defaultFullValue}
          />
        );
      }
      case 'newInvestment': {
        return (
          <CustomizedInvestment
            {...this.props}
            name={getName()}
            context={context}
            sentenceKey={sentenceKey}
            defaultFullValue={defaultFullValue}
          />
        );
      }
      case 'existingInvestment.lumpSum':
      case 'existingInvestment.regular': {
        return (
          <CustomizedExistingInvestment
            {...this.props}
            name={getName()}
            context={context}
            sentenceKey={sentenceKey}
            defaultFullValue={defaultFullValue}
          />
        );
      }
      case 'withdrawFunds.lumpSum':
      case 'withdrawFunds.regular': {
        return (
          <CustomizedWithdrawFunds
            {...this.props}
            name={getName()}
            context={context}
            sentenceKey={sentenceKey}
            defaultFullValue={defaultFullValue}
          />
        );
      }
      case 'funeralBond.new': {
        return (
          <CustomizedFuneralBond
            {...this.props}
            name={getName()}
            context={context}
            sentenceKey={sentenceKey}
            defaultFullValue={defaultFullValue}
          />
        );
      }
      case 'funeralBond.existing': {
        return (
          <CustomizedFuneralBond
            {...this.props}
            name={getName()}
            context={context}
            sentenceKey={sentenceKey}
            defaultFullValue={defaultFullValue}
            existingFuneralBond={true}
          />
        );
      }
      default:
        return null;
    }
  }

  public renderText = () => {
    const { strategy, client, partner, strategyType, strategyIndex, defaultFullValue, setFieldValue } = this.props;
    const strategySentenceKeys = strategy.sentence.split('.');
    const context = head(strategySentenceKeys);
    const sentenceKey = slice(strategySentenceKeys, 1).join('.');
    const strategySentence: Sentence = get(strategySentences, sentenceKey);

    if (context && strategySentence.custom) {
      return this.renderCustom(context, sentenceKey);
    }

    if (context && strategySentence && strategySentence.statement) {
      const stringReplacedByName = replaceDynamicValues(strategySentence.statement, { context, client, partner });
      const values = strategy.values || [];
      const arrayStatements = formatString(stringReplacedByName, values, (value: any, index: number) => {
        const optionalProps: { [key: string]: any } = {};
        if (strategySentence.types) {
          const type = strategySentence.types[index];
          let options = get(strategySentence, ['options', index], []);
          const name = `${strategyType}.strategies[${strategyIndex}].values[${index}]`;
          switch (type) {
            case EditCellType.select: {
              if (isString(options)) {
                if (options !== 'year') {
                  let option = options;
                  if (options[0] === '+') {
                    option = options.slice(1);
                    options = [...get(client, option), ...get(partner, option)];
                  } else {
                    options = getOptions(context, { client, partner }, options);
                  }
                  if (option === 'investments' && strategyType === StrategyTypes.Superannuation) {
                    options = [...options, { value: 'cashflow', label: 'Cashflow' }];
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
              break;
            }
            case EditCellType.number: {
              optionalProps.dollar = true;
              optionalProps.calculateWidth = true;
              break;
            }
            case EditCellType.text: {
              optionalProps.calculateWidth = true;
              break;
            }
            default:
              break;
          }

          return (
            <EditCell
              key={name}
              name={name}
              type={type}
              value={value}
              options={options}
              onChange={(val) => setFieldValue(name, val)}
              defaultFullValue={defaultFullValue}
              {...optionalProps}
            />
          );
        }

        return <Param key={index}>{value}</Param>;
      });

      arrayStatements.push(<br key={arrayStatements.length} />);
      return arrayStatements;
    }

    console.log('missing sentence key for:', sentenceKey);
    return null;
  }

  public onChangeCheck = (check: boolean) => {
    const { setFieldValue, strategyType, strategyIndex, redrawGraphs } = this.props;
    const fieldName = `${strategyType}.strategies[${strategyIndex}].check`;

    redrawGraphs();
    setFieldValue(fieldName, check);
  }

  public onChangeCheckMark = (check: boolean) => {
    const { setFieldValue, strategyType, strategyIndex } = this.props;
    const fieldName = `${strategyType}.strategies[${strategyIndex}].mark`;

    setFieldValue(fieldName, check);
  }

  public onChangeCheckMargin = (check: boolean) => {
    const { setFieldValue, strategyType, strategyIndex } = this.props;
    const fieldName = `${strategyType}.strategies[${strategyIndex}].margin`;

    setFieldValue(fieldName, check);
  }

  public render() {
    const { strategy, mark, margin, strategyType, strategyIndex, setFieldValue } = this.props;
    const customNoteName = `${strategyType}.strategies[${strategyIndex}].customNote`;

    return (
      <StrategyTableItems>
        <CheckboxInput value={strategy.check} onChange={this.onChangeCheck} />
        <StrategyTableText>
          {this.renderText()}
          {typeof strategy.customNote !== 'undefined' && (
            <EditCell
              name={customNoteName}
              value={strategy.customNote}
              type={EditCellType.textarea}
              onChange={(val) => setFieldValue(customNoteName, val)}
              placeholder="Enter custom note"
            />
          )}
        </StrategyTableText>
        {mark && <CheckboxInput value={strategy.mark || false} onChange={this.onChangeCheckMark} custom={true} />}
        {margin && <CheckboxInput value={strategy.margin || false} onChange={this.onChangeCheckMargin} custom={true} />}
        <StrategyTableIcon>
          <Dropdown
            overlay={
              <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" className="delete-action">
                  <Popconfirm title="Really delete?" okText="Yes" cancelText="No" onConfirm={this.removeItem}>
                    <Icon type="close" />
                    Delete
                  </Popconfirm>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon component={Projections} />
                  Projections
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="plus" />
                  Custom note
                </Menu.Item>
              </Menu>
            }
            overlayClassName="more-dropdown"
          >
            <Icon type="more" />
          </Dropdown>
        </StrategyTableIcon>
      </StrategyTableItems>
    );
  }
}

export default StrategyItem;

import React from 'react';
import numeral from 'numeral';
import { FullyCustomized } from '../Drawer/styled';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { find, get, map, random, findIndex } from 'lodash';
import { getOptions, StrategyItemProps } from './StrategyItem';

const specificOptions = [{ value: 'specific', label: 'Specific' }, { value: 'custom', label: 'Custom' }];
const reinvestIncome = [
  {
    value: 'reinvest',
    label: 'Reinvest Income',
  },
  {
    value: 'paidOut',
    label: 'Investment income paid out',
  },
];
const investmentIncomePaidOut = 5678;

const CustomizedInvestment = (
  props: StrategyItemProps & { name: string; context: string; sentenceKey: string; defaultFullValue: number },
) => {
  const { name, context, client, partner, strategy, strategyIndex, strategyType, defaultFullValue } = props;
  const reinvestIncomeOptions = map(reinvestIncome, (option) => ({
    ...option,
    label:
      option.value === 'paidOut'
        ? `${option.label} $(${numeral(investmentIncomePaidOut).format('0,0')})`
        : option.label,
  }));
  const investmentOptions = getOptions(context, { client, partner }, 'investments');
  const [specificValue, setSpecificValue] = React.useState<any>(get(strategy, 'values[2]'));
  const [investmentValues, setInvestmentValues] = React.useState<any>(get(strategy, 'values[4]'));
  const isCustomSpecific = specificValue === 'custom';
  const [fullValue, setDefaultFullValue] = React.useState<number>(
    get(find(investmentOptions, { value: specificValue }), 'fullValue', defaultFullValue),
  );
  const updateSpecific = (value: any) => {
    setSpecificValue(value);
    if (value === 'specific') {
      setInvestmentValues(get(investmentOptions, [0, 'value']));
    } else {
      setInvestmentValues([]);
    }
  };
  const asyncUpdateFullValue = (val: any) => {
    // Call API and set response to full value
    setDefaultFullValue(random(1000, 5000));
  };
  const updateListOfInvestmentAccounts = (val: string) => {
    const { setFieldValue } = props;
    const currentInvestmentAccounts = get(props, [context, 'investments'], []);
    const id = strategy.id || `${strategyIndex}-investment`;
    const existingInvestmentIndex = findIndex(currentInvestmentAccounts, { id });
    if (existingInvestmentIndex !== -1) {
      currentInvestmentAccounts[existingInvestmentIndex].label = val;
    } else {
      currentInvestmentAccounts.push({ id, value: id, label: val });
    }

    setFieldValue(`${context}.investments`, currentInvestmentAccounts);
  };

  return (
    <FullyCustomized>
      <span>
        Establish a new investment portfolio{' '}
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
          type={EditCellType.text}
          value={get(strategy, 'values[0]')}
          onChange={updateListOfInvestmentAccounts}
          calculateWidth={true}
          placeholder={'Enter portfolio name'}
          quotationMark={true}
        />
      </span>
      <br />
      <span>
        {name}, establish a new investment portfolio in{' '}
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
          value={get(strategy, 'values[1]')}
          type={EditCellType.date}
          onChange={(val) => console.log(val)}
        />
        .
      </span>
      <br />
      <span>Make a</span>
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
        value={specificValue}
        type={EditCellType.select}
        options={specificOptions}
        onChange={updateSpecific}
      />
      widthdrawals worth
      {isCustomSpecific ? (
        <b> ${numeral(fullValue).format('0,0')} </b>
      ) : (
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[3]`}
          value={get(strategy, 'values[3]')}
          type={EditCellType.number}
          onChange={(val) => console.log(val)}
          dollar={true}
          calculateWidth={true}
        />
      )}
      <span>{isCustomSpecific ? 'from' : 'from your'}</span>
      {isCustomSpecific ? (
        <ul>
          {map(investmentOptions, (option: { value: any; label: string }, index: number) => (
            <li key={index}>
              {option.label} (
              <EditCell
                key={index}
                name={`${strategyType}.strategies[${strategyIndex}].values[4][${index}]`}
                type={EditCellType.number}
                value={get(strategy, ['values', 4, index], 0)}
                onChange={(val) => {
                  asyncUpdateFullValue(val);
                }}
                dollar={true}
                calculateWidth={true}
              />
              )
            </li>
          ))}
        </ul>
      ) : (
        <>
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[5]`}
            value={investmentValues}
            options={investmentOptions}
            type={EditCellType.select}
            onChange={(val) => console.log(val)}
          />
          ,{' '}
        </>
      )}
      <span>to establish a new investment portfolio in</span>
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[5]`}
        type={EditCellType.date}
        value={get(strategy, 'values[5]')}
        onChange={(val) => {
          console.log(val);
        }}
      />
      <br />
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[6]`}
        value={get(strategy, 'values[6]')}
        type={EditCellType.select}
        options={reinvestIncomeOptions}
        onChange={(val) => console.log(val)}
      />
    </FullyCustomized>
  );
};

export default CustomizedInvestment;

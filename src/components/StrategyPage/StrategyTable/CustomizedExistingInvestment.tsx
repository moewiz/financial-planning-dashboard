import React from 'react';
import numeral from 'numeral';
import { FullyCustomized } from '../Drawer/styled';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { find, get, map, random } from 'lodash';
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

const CustomizedExistingInvestment = (
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
  const [specificValue, setSpecificValue] = React.useState<any>(get(strategy, 'values[1]'));
  const [investmentValues, setInvestmentValues] = React.useState<any>(get(strategy, 'values[3]'));
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

  return (
    <FullyCustomized>
      Client, make a lump sum contribution into Investment account 2 in Jan 2020 Make a Specific withdrawal from your
      Investment account 1 worth $1,920 and invest the proceeds in the recommended portfolio.
    </FullyCustomized>
  );
};

export default CustomizedExistingInvestment;

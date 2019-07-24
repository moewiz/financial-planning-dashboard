import React from 'react';
import { FullyCustomized } from '../Drawer/styled';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { get } from 'lodash';
import { getOptions, StrategyItemProps } from './StrategyItem';

const CustomizedWithdrawFunds = (
  props: StrategyItemProps & { name: string; context: string; sentenceKey: string; defaultFullValue: number },
) => {
  const { name, context, client, partner, strategy, strategyIndex, strategyType, sentenceKey, setFieldValue } = props;
  const investmentOptions = getOptions(context, { client, partner }, 'investments');
  const investmentOptions2 = [...investmentOptions, { value: 'cashflow', label: 'Cashflow' }];
  const isRegular = sentenceKey === 'withdrawFunds.regular';

  return (
    <FullyCustomized>
      {name}, make a {isRegular ? 'regular' : 'lump sum'} withdrawal from{' '}
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
        value={get(strategy, 'values[0]')}
        type={EditCellType.select}
        options={investmentOptions}
        onChange={(val, fieldName) => setFieldValue(fieldName, val)}
      />
      <span>for</span>
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
        value={get(strategy, 'values[1]')}
        type={EditCellType.number}
        onChange={(val, fieldName) => setFieldValue(fieldName, val)}
        dollar={true}
        calculateWidth={true}
      />
      <br />
      <span>
        Direct the proceeds {isRegular ? 'into' : 'to'}
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
          value={get(strategy, 'values[2]')}
          type={EditCellType.select}
          options={investmentOptions2}
          onChange={(val, fieldName) => setFieldValue(fieldName, val)}
        />
      </span>
    </FullyCustomized>
  );
};

export default CustomizedWithdrawFunds;

import React from 'react';
import numeral from 'numeral';
import { FullyCustomized } from '../Drawer/styled';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { find, get } from 'lodash';
import { getOptions, StrategyItemProps } from './StrategyItem';

const CustomizedExistingInvestment = (
  props: StrategyItemProps & { name: string; context: string; sentenceKey: string; defaultFullValue: number },
) => {
  const { name, context, client, partner, strategy, strategyIndex, strategyType, sentenceKey } = props;
  const isRegular = sentenceKey === 'existingInvestment.regular';
  const investmentOptions = getOptions(context, { client, partner }, 'investments');
  const investmentOptions2 = [...investmentOptions, { value: 'cashflow', label: 'Cashflow' }];
  const [fullValue, setFullValue] = React.useState<number>(
    get(find(investmentOptions, { value: get(strategy, 'values[2]') }), 'fullValue', 0),
  );
  const updateFullValue = (val: any) => {
    setFullValue(get(find(investmentOptions, { value: val }), 'fullValue', 0));
  };

  if (isRegular) {
    return (
      <FullyCustomized>
        {name}, make a regular contribution into{' '}
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
          value={get(strategy, 'values[0]')}
          type={EditCellType.select}
          options={investmentOptions}
          onChange={(val) => console.log(val)}
        />
        from
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
          value={get(strategy, 'values[1]')}
          type={EditCellType.date}
          onChange={(val) => console.log(val)}
        />
        to
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
          value={get(strategy, 'values[2]')}
          type={EditCellType.date}
          onChange={(val) => console.log(val)}
        />
        <br />
        <span>
          The contributions are to be funded from
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[3]`}
            value={get(strategy, 'values[3]')}
            type={EditCellType.select}
            options={investmentOptions2}
            onChange={(val) => console.log(val)}
          />
        </span>
      </FullyCustomized>
    );
  }

  return (
    <FullyCustomized>
      {name}, make a lump sum contribution into{' '}
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
        value={get(strategy, 'values[0]')}
        type={EditCellType.select}
        options={investmentOptions}
        onChange={(val) => console.log(val)}
      />
      <span>in</span>
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
        value={get(strategy, 'values[1]')}
        type={EditCellType.date}
        onChange={(val) => console.log(val)}
      />
      <br />
      <span>
        Make a Specific withdrawal from your
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
          value={get(strategy, 'values[2]')}
          type={EditCellType.select}
          options={investmentOptions}
          onChange={updateFullValue}
        />
        worth <b>${numeral(fullValue).format('0,0')}</b> and invest the proceeds in the recommended portfolio.
      </span>
    </FullyCustomized>
  );
};

export default CustomizedExistingInvestment;

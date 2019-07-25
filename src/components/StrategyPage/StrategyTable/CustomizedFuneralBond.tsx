import React from 'react';
import { FullyCustomized } from '../Drawer/styled';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { get, findIndex } from 'lodash';
import { getOptions, StrategyItemProps } from './StrategyItem';

const CustomizedFuneralBond = (
  props: StrategyItemProps & {
    name: string;
    context: string;
    sentenceKey: string;
    defaultFullValue: number;
    existingFuneralBond?: boolean;
  },
) => {
  const {
    name,
    context,
    client,
    partner,
    strategy,
    strategyIndex,
    strategyType,
    setFieldValue,
    existingFuneralBond,
  } = props;
  const investmentOptions = getOptions('joint', { client, partner }, 'investments');
  const funeralBondOptions = getOptions(context, { client, partner }, 'funeralBond');
  if (funeralBondOptions.length === 0) {
    funeralBondOptions.push({ value: 'disabled', label: 'No existing funeral bonds', disabled: true });
  }
  const updateListOfFuneralBond = (val: string, fieldName: string) => {
    const currentFuneralBond = get(props, [context, 'funeralBond'], []);
    const id = strategy.id || `${strategyIndex}-funeralBond`;
    const existingFuneralBondIndex = findIndex(currentFuneralBond, { id });
    if (existingFuneralBondIndex !== -1) {
      currentFuneralBond[existingFuneralBondIndex].label = val;
    } else {
      currentFuneralBond.push({ id, value: id, label: val });
    }

    setFieldValue(fieldName, val);
    setFieldValue(`${context}.funeralBond`, currentFuneralBond);
  };

  if (existingFuneralBond) {
    return (
      <FullyCustomized>
        <span>
          {name}, utilise
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
            value={get(strategy, 'values[0]')}
            type={EditCellType.number}
            onChange={(val, fieldName) => setFieldValue(fieldName, val)}
            dollar={true}
            calculateWidth={true}
          />
          from
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
            value={get(strategy, 'values[1]')}
            options={investmentOptions}
            type={EditCellType.select}
            onChange={(val, fieldName) => setFieldValue(fieldName, val)}
          />
          to top up your
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
            type={EditCellType.select}
            value={get(strategy, 'values[2]')}
            options={funeralBondOptions}
            onChange={(val, fieldName) => setFieldValue(fieldName, val)}
          />
        </span>
      </FullyCustomized>
    );
  }

  return (
    <FullyCustomized>
      <span>
        {name}, utilise
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
          value={get(strategy, 'values[0]')}
          type={EditCellType.number}
          onChange={(val, fieldName) => setFieldValue(fieldName, val)}
          dollar={true}
          calculateWidth={true}
        />
        from
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
          value={get(strategy, 'values[1]')}
          options={investmentOptions}
          type={EditCellType.select}
          onChange={(val, fieldName) => setFieldValue(fieldName, val)}
        />
        to purchase a new funeral bond
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
          type={EditCellType.text}
          value={get(strategy, 'values[2]')}
          onChange={updateListOfFuneralBond}
          calculateWidth={true}
          options={{
            placeholder: 'Enter funeral bond name',
            quotationMark: true,
          }}
        />
      </span>
    </FullyCustomized>
  );
};

export default CustomizedFuneralBond;

import React, { useEffect } from 'react';
import { get, find } from 'lodash';

import { getOptions, StrategyItemProps } from './StrategyItem';
import { FullyCustomized } from '../Drawer/styled';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { varyOptions } from '../../../enums/strategySentences';

const getAction = (key: string) => {
  switch (key) {
    case 'establish':
      return 'establish a new';
    case 'retain':
      return 'retain your existing';
    case 'cancel':
      return 'cancel your existing';
    default:
      return '';
  }
};

const EstablishInsurance = (
  props: StrategyItemProps & {
    name: string;
    context: string;
    sentenceKey: string;
    defaultFullValue: number;
  },
) => {
  const { name, context, client, partner, strategy, strategyIndex, strategyType, setFieldValue, sentenceKey } = props;
  const insuranceOptions = getOptions(context, { client, partner }, 'insurance');

  if (sentenceKey === 'vary') {
    const varyInsurance = get(strategy, 'values[1]');
    const varyInsuranceOption = find(insuranceOptions, ['value', varyInsurance]);
    const onChangeVaryInsurance = (val: any, fieldName: string) => {
      setFieldValue(fieldName, val);
    };

    return (
      <FullyCustomized>
        <span>
          {name},
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
            value={get(strategy, 'values[0]')}
            options={varyOptions}
            type={EditCellType.select}
            onChange={(val, fieldName) => setFieldValue(fieldName, val)}
          />
          your existing
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
            value={varyInsurance}
            options={insuranceOptions}
            type={EditCellType.select}
            onChange={onChangeVaryInsurance}
          />
          cover of
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
            value={get(strategy, 'values[2]')}
            type={EditCellType.number}
            onChange={(val, fieldName) => setFieldValue(fieldName, val)}
            dollar={true}
            calculateWidth={true}
          />
          {varyInsuranceOption && varyInsuranceOption.perMonth && 'per month'}
        </span>
      </FullyCustomized>
    );
  }

  const insurance = get(strategy, 'values[0]');
  const insuranceOption = find(insuranceOptions, ['value', insurance]);
  const disableEditAmount = sentenceKey === 'retain' || sentenceKey === 'cancel';
  const onChangeInsurance = (val: any, fieldName: string) => {
    setFieldValue(fieldName, val);
  };
  useEffect(() => {
    if (disableEditAmount) {
      const selectedInsurance = find(insuranceOptions, ['value', insurance]);
      if (selectedInsurance && selectedInsurance.amount !== undefined) {
        setFieldValue(`${strategyType}.strategies[${strategyIndex}].values[1]`, selectedInsurance.amount);
      }
    }
  }, [insurance]);

  return (
    <FullyCustomized>
      <span>
        {name}, {getAction(sentenceKey) + ' '}
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
          value={insurance}
          options={insuranceOptions}
          type={EditCellType.select}
          onChange={onChangeInsurance}
        />
        {' '}insurance cover of{' '}
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
          value={get(strategy, 'values[1]')}
          type={EditCellType.number}
          onChange={(val, fieldName) => setFieldValue(fieldName, val)}
          dollar={true}
          calculateWidth={true}
          disabled={disableEditAmount}
        />
        {insuranceOption && insuranceOption.perMonth && 'per month'}
      </span>
    </FullyCustomized>
  );
};

export default EstablishInsurance;

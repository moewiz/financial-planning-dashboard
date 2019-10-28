import React from 'react';
import numeral from 'numeral';
import { FullyCustomized } from '../Drawer/styled';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { find, get, random, map } from 'lodash';
import { getOptions, StrategyItemProps } from './StrategyItem';
import { periodTypes, specificOptions } from '../../../enums/strategySentences';

const CustomizedExistingInvestment = (
  props: StrategyItemProps & { name: string; context: string; sentenceKey: string; defaultFullValue: number },
) => {
  const {
    name: fullName,
    context,
    client,
    partner,
    strategy,
    strategyIndex,
    strategyType,
    sentenceKey,
    setFieldValue,
  } = props;
  const isRegular = sentenceKey === 'existingInvestment.regular';
  const investmentOptions = getOptions(context, { client, partner }, 'investments');
  const investmentOptions2 = [...investmentOptions, { value: 'cashflow', label: 'Cashflow' }];
  const [fullValue, setFullValue] = React.useState<number>(
    get(find(investmentOptions, { value: get(strategy, ['values', isRegular ? 5 : 3]) }), 'fullValue', 0),
  );
  const updateFullValue = (val: any, fieldName: string) => {
    setFieldValue(fieldName, val);
    setFullValue(get(find(investmentOptions, { value: val }), 'fullValue', 0));
  };

  if (isRegular) {
    return (
      <FullyCustomized>
        {fullName}, make a regular contribution of
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
          value={get(strategy, 'values[0]')}
          type={EditCellType.number}
          onChange={(val, fieldName) => setFieldValue(fieldName, val)}
          dollar={true}
          calculateWidth={true}
        />
        per
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
          value={get(strategy, 'values[1]')}
          onChange={(val, fieldName) => setFieldValue(fieldName, val)}
          type={EditCellType.select}
          options={periodTypes}
        />
        into
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
          value={get(strategy, 'values[2]')}
          type={EditCellType.select}
          options={investmentOptions}
          onChange={(val, name) => setFieldValue(name, val)}
        />
        from
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[3]`}
          value={get(strategy, 'values[3]')}
          type={EditCellType.date}
          onChange={(val, name) => setFieldValue(name, val)}
        />
        to
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[4]`}
          value={get(strategy, 'values[4]')}
          type={EditCellType.date}
          onChange={(val, name) => setFieldValue(name, val)}
        />
        <br />
        <span>
          The contributions are to be funded from
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[5]`}
            value={get(strategy, 'values[5]')}
            type={EditCellType.select}
            options={investmentOptions2}
            onChange={(val, name) => setFieldValue(name, val)}
          />
        </span>
      </FullyCustomized>
    );
  }
  const isCustom = get(strategy, 'values[2]') === 'custom';
  const asyncUpdateFullValue = (val: any) => {
    // Call API and set response to full value
    setFullValue(random(1000, 5000));
  };
  const updateSpecific = (value: any, fieldName: string) => {
    setFieldValue(fieldName, value);
    const investmentValuesFieldName = `${strategyType}.strategies[${strategyIndex}].values[4]`;
    const investmentValues = value === 'custom' ? map(investmentOptions, ['fullValue']) : 0;
    setFieldValue(investmentValuesFieldName, investmentValues);
  };

  return (
    <FullyCustomized>
      {fullName}, make a lump sum contribution into{' '}
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
        value={get(strategy, 'values[0]')}
        type={EditCellType.select}
        options={investmentOptions}
        onChange={(val, name) => setFieldValue(name, val)}
      />
      <span>in</span>
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
        value={get(strategy, 'values[1]')}
        type={EditCellType.date}
        onChange={(val, name) => setFieldValue(name, val)}
      />
      <br />
      <span>Make a</span>
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
        value={get(strategy, 'values[2]')}
        type={EditCellType.select}
        options={specificOptions}
        onChange={updateSpecific}
      />{' '}
      {isCustom ? (
        <>
          <span>withdrawal worth</span>
          <b> ${numeral(fullValue).format('0,0')} </b>
          <span>from</span>
          <ul>
            {map(investmentOptions, (option: { value: any; label: string }, index: number) => (
              <li key={index}>
                {option.label} (
                <EditCell
                  key={index}
                  name={`${strategyType}.strategies[${strategyIndex}].values[4][${index}]`}
                  type={EditCellType.number}
                  value={get(strategy, ['values', 4, index], 0)}
                  onChange={(val, name) => {
                    setFieldValue(name, val);
                    asyncUpdateFullValue(val);
                  }}
                  dollar={true}
                  calculateWidth={true}
                />
                )
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <span> withdrawal from your </span>
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[3]`}
            value={get(strategy, 'values[3]')}
            type={EditCellType.select}
            options={investmentOptions}
            onChange={updateFullValue}
          />
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[4]`}
            value={get(strategy, 'values[4]')}
            type={EditCellType.dropdownFreeText}
            onChange={(val, name) => setFieldValue(name, val)}
            defaultFullValue={fullValue}
          />
        </>
      )}
      <span>to fund the recommended contribution.</span>
    </FullyCustomized>
  );
};

export default CustomizedExistingInvestment;

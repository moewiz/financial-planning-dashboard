import React, { useEffect } from 'react';
import { notification } from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import { dropRight, find, get, map, random, findIndex, filter } from 'lodash';

import { FullyCustomized } from '../Drawer/styled';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { getOptions, StrategyItemProps } from './StrategyItem';
import { periodTypes } from '../../../enums/strategySentences';

const defaultTime = '2023-07-09T12:00:00';

const CustomizedPension = (
  props: StrategyItemProps & {
    name: string;
    context: string;
    sentenceKey: string;
    defaultFullValue: number;
    setLoading: () => void;
  },
) => {
  const {
    name,
    context,
    client,
    partner,
    sentenceKey,
    strategy,
    strategyIndex,
    strategyType,
    defaultFullValue,
    setFieldValue,
    setLoading,
  } = props;
  const id = strategy.id || `${strategyIndex}-superannuation`;
  const pensionIncomeOptions = map(getOptions(context, { client, partner }, 'pensionIncome'), (option) => ({
    ...option,
    label: option.income ? `${option.label} $(${numeral(option.income).format('0,0')})` : option.label,
    renderedLabel: option.income
      ? `${option.renderedLabel} $(${numeral(option.income).format('0,0')})`
      : option.renderedLabel,
  }));
  const superannuationOptions = filter(
    map(getOptions(context, { client, partner }, 'superannuation')),
    (superannuation: any) => superannuation.id !== id,
  );
  superannuationOptions.push({
    value: 'customisedRollover',
    label: 'Customised Rollover',
    fullValue: defaultFullValue,
  });
  const title = sentenceKey === 'commenceAccount' ? 'an account based pension' : 'a TTR pension';
  const [superValue, setSuperValue] = React.useState<any>(get(strategy, 'values[2]'));
  const [pensionIncome, setPensionIncome] = React.useState<any>(get(strategy, 'values[5][0]'));
  const isCustomisedRollover = superValue === 'customisedRollover';
  const [fullValue, setDefaultFullValue] = React.useState<number>(
    get(find(superannuationOptions, { value: superValue }), 'fullValue', defaultFullValue),
  );
  const updateFullValue = (value: any) => {
    setSuperValue(value);
    if (value !== 'customisedRollover') {
      // load full value from Superannuation option
      const superFullValue = get(find(superannuationOptions, { value }), 'fullValue', defaultFullValue);
      setDefaultFullValue(superFullValue);
    } else {
      // load full value from JSON
      setDefaultFullValue(defaultFullValue);
    }
  };
  const asyncUpdateFullValue = (val: any) => {
    // Call API and set response to full value
    setDefaultFullValue(random(1000, 5000));
  };
  const updateListOfCurrentSuperannuation = (val: string, fieldName: string) => {
    if (context === 'joint') {
      return;
    }
    const currentSuperannuation = get(props, [context, 'superannuation'], []);
    const existingSuperannuationIndex = findIndex(currentSuperannuation, { id });
    if (existingSuperannuationIndex !== -1) {
      currentSuperannuation[existingSuperannuationIndex].label = val;
    } else {
      currentSuperannuation.push({ id, value: id, label: val });
    }

    setFieldValue(fieldName, val);
    setFieldValue(`${context}.superannuation`, currentSuperannuation);
  };
  useEffect(() => {
    setPensionIncome(get(strategy, 'values[5][0]'));
  }, [strategy]);
  const onChange = (val: any, fieldName: string) => setFieldValue(fieldName, val);
  const onChangeTime = (val: any, fieldName: string) => {
    // fade out this strategy item for 3s
    setLoading();
    const shouldWarning = moment(defaultTime).isAfter(val);

    setFieldValue(fieldName, val);
    setFieldValue(`${strategyType}.strategies[${strategyIndex}].invalid`, shouldWarning);
    if (shouldWarning) {
      const dob = context === 'client' ? client.dob : partner.dob;
      const aged = moment(val).diff(dob, 'year');

      notification.warning({
        message: 'Warning',
        description: (
          <>
            <span>Condition of release not met.</span>
            <p>
              Client aged <b>{aged}</b> and <b>employed</b>
            </p>
          </>
        ),
      });
    }
  };

  return (
    <FullyCustomized>
      {name}, commence {title}
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[0]`}
        type={EditCellType.text}
        value={get(strategy, 'values[0]')}
        onChange={updateListOfCurrentSuperannuation}
        calculateWidth={true}
        options={{
          placeholder: 'Enter pension name',
          quotationMark: true,
        }}
      />
      in
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
        type={EditCellType.date}
        value={get(strategy, 'values[1]')}
        onChange={onChangeTime}
      />
      <span>{isCustomisedRollover ? 'as a' : 'from your'}</span>
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
        value={superValue}
        type={EditCellType.select}
        options={superannuationOptions}
        onChange={updateFullValue}
      />
      <span>
        with{' '}
        {isCustomisedRollover ? (
          <b>${numeral(fullValue).format('0,0')}</b>
        ) : (
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[3]`}
            value={get(strategy, 'values[3]')}
            type={EditCellType.dropdownFreeText}
            onChange={onChange}
            defaultFullValue={fullValue}
          />
        )}
      </span>
      {isCustomisedRollover ? (
        <ul>
          {map(dropRight(superannuationOptions, 1), (option: { value: any; label: string }, index: number) => (
            <li key={index}>
              {option.label} (
              <EditCell
                key={index}
                name={`${strategyType}.strategies[${strategyIndex}].values[4][${index}]`}
                type={EditCellType.number}
                value={get(strategy, ['values', 4, index])}
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
        <br />
      )}
      <span>
        Drawdown{' '}
        <EditCell
          name={`${strategyType}.strategies[${strategyIndex}].values[5][0]`}
          value={pensionIncome}
          type={EditCellType.select}
          options={pensionIncomeOptions}
          onChange={(val) => setPensionIncome(val)}
          yearFi={true}
        />{' '}
        {pensionIncome !== 'meetExpenses' ? (
          <>
            {pensionIncome === 'specific' && (
              <EditCell
                name={`${strategyType}.strategies[${strategyIndex}].values[5][1]`}
                value={get(strategy, 'values[5][1]')}
                type={EditCellType.number}
                onChange={onChange}
                dollar={true}
                calculateWidth={true}
              />
            )}
            per
            <EditCell
              name={`${strategyType}.strategies[${strategyIndex}].values[6]`}
              value={get(strategy, 'values[6]')}
              onChange={onChange}
              type={EditCellType.select}
              options={periodTypes}
            />
          </>
        ) : null}
      </span>
    </FullyCustomized>
  );
};

export default CustomizedPension;

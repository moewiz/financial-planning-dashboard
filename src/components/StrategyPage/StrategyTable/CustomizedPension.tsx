import React from 'react';
import { DrawerTableRows, FullyCustomized } from '../Drawer/styled';
import EditCell, { EditCellType } from '../Drawer/EditCell';
import { get, dropRight, isString, find, map, replace, slice, trim, random } from 'lodash';
import { getOptions, StrategyItemProps } from './StrategyItem';

const defaultFullValues = [1000, 2000, 3000, 4000];

const CustomizedPension = (
  props: StrategyItemProps & { name: string; context: string; sentenceKey: string; defaultFullValue: number },
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
  } = props;
  const superannuationOptions = map(
    getOptions(context, { client, partner }, 'superannuation'),
    (option, index: number) => ({
      ...option,
      fullValue: get(defaultFullValues, index, 0),
    }),
  );
  superannuationOptions.push({ value: 'customisedRollover', label: 'Customised Rollover' });
  const title = sentenceKey === 'commenceAccount' ? 'an account based pension' : 'a TTR pension';
  const [superValue, setSuperValue] = React.useState<any>(get(strategy, 'values[1]'));
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

  return (
    <FullyCustomized>
      {name}, commence {title} in
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
      <span>{isCustomisedRollover ? 'as a' : 'from your'}</span>
      <EditCell
        name={`${strategyType}.strategies[${strategyIndex}].values[1]`}
        value={superValue}
        type={EditCellType.select}
        options={superannuationOptions}
        onChange={updateFullValue}
      />
      <span>
        with {/*<b>{get(strategy, ['values', 2], 0)}</b>*/}
        {isCustomisedRollover ? (
          <b>{fullValue}</b>
        ) : (
          <EditCell
            name={`${strategyType}.strategies[${strategyIndex}].values[2]`}
            value={get(strategy, 'values[2]')}
            type={EditCellType.dropdownFreeText}
            onChange={(val) => console.log(val)}
            defaultFullValue={fullValue}
          />
        )}
      </span>
      {isCustomisedRollover && (
        <ul>
          {map(dropRight(superannuationOptions, 1), (option: { value: any; label: string }, index: number) => (
            <li key={index}>
              {option.label} (
              <DrawerTableRows noBorder key={index} className={'strategy-item'}>
                <EditCell
                  name={`${strategyType}.strategies[${strategyIndex}].values[3][${index}]`}
                  type={EditCellType.number}
                  value={get(strategy, ['values', 3, index])}
                  onChange={(val) => {
                    asyncUpdateFullValue(val);
                  }}
                  dollar={true}
                  calculateWidth={true}
                />
              </DrawerTableRows>
              )
            </li>
          ))}
        </ul>
      )}
      <span>Drawdown pension income of $xx per month/annum</span>
    </FullyCustomized>
  );
};

export default CustomizedPension;

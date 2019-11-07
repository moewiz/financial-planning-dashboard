import React, { useState } from 'react';
import { connect } from 'formik';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { SliderValue } from 'antd/lib/slider';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import { StepCurrentPosition, StepPositionLeft, StepPositionRight } from '../PresentationStep2/styled';
import SlidersBlock from './SlidersBlock';
import EventsBlock from './EventsBlock';
import ChartsBlock from './ChartsBlock';
import { CheckboxGroup } from './styled';
import { CheckboxCustomize } from '../../StrategyPage/StrategyTable/styled';
import {
  chartsDataResources,
  chartsDataResourcesWithoutSalarySacrifice,
  chartsDataResourcesWithoutSalarySacrificeNInsuranceWithLifeEvent,
} from './chartData';

interface CheckListInterface {
  'Salary Sacrifice'?: boolean;
  'Non-Concessional Contribution'?: boolean;
  'Establish a pension'?: boolean;
  'Debt reduction'?: boolean;
  Insurance?: boolean;
  'Estate Planning'?: boolean;
}

const defaultCheckListValue = {
  'Salary Sacrifice': true,
  'Non-Concessional Contribution': true,
  'Establish a pension': true,
  'Debt reduction': true,
  'Insurance': true,
  'Estate Planning': true,
};

const checkBoxList = [
  'Salary Sacrifice',
  'Non-Concessional Contribution',
  'Establish a pension',
  'Debt reduction',
  'Insurance',
  'Estate Planning',
];

const emptyFn = () => null;

const CheckboxContainer = (props: { children: React.ReactNode; handleItemToggle?: (isToggle: boolean) => void }) => {
  const { handleItemToggle = emptyFn, children } = props;
  const [value, setValue] = useState<boolean>(true);
  const onChange = (e: CheckboxChangeEvent) => {
    setValue(e.target.checked);
    handleItemToggle(e.target.checked);
  };

  return (
    <CheckboxCustomize>
      <Checkbox checked={value} onChange={onChange}>
        {children}
      </Checkbox>
    </CheckboxCustomize>
  );
};

const getData = (hasLifeEvent: boolean, retirementYrs: number, checkList?: CheckListInterface) => {
  if (!(checkList as any)['Salary Sacrifice'] && !(checkList as any).Insurance && hasLifeEvent) {
    return (chartsDataResourcesWithoutSalarySacrificeNInsuranceWithLifeEvent as any)[retirementYrs];
  }

  if (!(checkList as any)['Salary Sacrifice'] && hasLifeEvent) {
    return (chartsDataResources as any)[retirementYrs];
  }

  if (!(checkList as CheckListInterface)['Salary Sacrifice']) {
    return (chartsDataResourcesWithoutSalarySacrifice as any)[retirementYrs];
  }

  if (hasLifeEvent) {
    // return (chartsDataResourcesWithLifeEvent as any)[retirementYrs];
    return (chartsDataResources as any)[retirementYrs];
  }

  return (chartsDataResources as any)[retirementYrs];
};

// forget about DRY
// im gonna done it fast :/
const PresentationStep5 = (props: FormikPartProps) => {
  // a quick and dirty solution to let the presentation step 3 knows that we've added a life event
  // I have to do this because indra requires the task have to be completed within this afternoon
  // TODO: refactor this to reducer
  const [hasLifeEvent, setHasLifeEvent] = useState(false);
  const [checkList, setCheckList] = useState(defaultCheckListValue);
  const [retirementYrs, setRetirementYrs] = useState(60);
  const [chartsData, setChartsData] = useState(chartsDataResources['60']);
  // handle when a check box is checked or unchecked
  const onSetCheckList = (itemName: string) => (isToggle: boolean) => {
    const newCheckList = {
      ...checkList,
      [itemName]: isToggle,
    };
    const chartData = getData(hasLifeEvent, retirementYrs, newCheckList);
    setCheckList(newCheckList);
    setChartsData(chartData);
  };
  // handle the case that when a user added a life event
  const onSetHasLifeEvent = (hle: boolean) => {
    const chartData = getData(hle, retirementYrs, checkList);
    setChartsData(chartData);
    setHasLifeEvent(hle);
  };
  // handle retirement year has been changed
  const onChangeRetirementYear = (retirementYear: SliderValue) => {
    return;
    // const chartData = getData(hasLifeEvent, retirementYear as number, checkList);
    // setChartsData(chartData);
    // if (retirementYear === 65) {
    //   setRetirementYrs(65);
    // }
    // if (retirementYear === 60) {
    //   setRetirementYrs(60);
    // }
  };

  return (
    <StepWrapper>
      <CheckboxGroup>
        {checkBoxList.map((cb: string) => (
          <CheckboxContainer key={cb} handleItemToggle={onSetCheckList(cb)}>
            {cb}
          </CheckboxContainer>
        ))}
      </CheckboxGroup>
      <StepCurrentPosition>
        <StepPositionLeft style={{ flex: '0 0 295px', padding: '15px', border: '1px solid #dedede' }}>
          <SlidersBlock onChangeRetirementYear={onChangeRetirementYear} />
          <EventsBlock setHasLifeEvent={onSetHasLifeEvent} />
        </StepPositionLeft>
        <StepPositionRight>
          <ChartsBlock
            chartsData={chartsData}
            retirementYear={retirementYrs}
            hasLifeEvent={hasLifeEvent}
            checkList={checkList}
          />
        </StepPositionRight>
      </StepCurrentPosition>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep5);

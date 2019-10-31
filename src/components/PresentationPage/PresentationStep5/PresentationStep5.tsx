import React, { useState } from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import { StepCurrentPosition, StepPositionLeft, StepPositionRight } from '../PresentationStep2/styled';
import SlidersBlock from '../PresentationStep3/SlidersBlock';
import EventsBlock from '../PresentationStep3/EventsBlock';
import ChartsBlock from '../PresentationStep3/ChartsBlock';
import { CheckboxGroup } from './styled';
import { CheckboxCustomize } from '../../StrategyPage/StrategyTable/styled';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { chartsDataResources } from '../PresentationStep3/PresentationStep3';

const CheckboxContainer = (props: { children: React.ReactNode }) => {
  const [value, setValue] = useState<boolean>(true);
  const onChange = (e: CheckboxChangeEvent) => {
    setValue(e.target.checked);
  };

  return (
    <CheckboxCustomize>
      <Checkbox checked={value} onChange={onChange}>
        {props.children}
      </Checkbox>
    </CheckboxCustomize>
  );
};

const PresentationStep5 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <CheckboxGroup>
        <CheckboxContainer>Salary Sacrifice</CheckboxContainer>
        <CheckboxContainer>Non-Concessional Contribution</CheckboxContainer>
        <CheckboxContainer>Establish a pension</CheckboxContainer>
        <CheckboxContainer>Debt reduction</CheckboxContainer>
        <CheckboxContainer>Insurance</CheckboxContainer>
        <CheckboxContainer>Estate Planning</CheckboxContainer>
      </CheckboxGroup>
      <StepCurrentPosition>
        <StepPositionLeft style={{ flex: '0 0 295px', padding: '15px', border: '1px solid #dedede' }}>
          <SlidersBlock />
          <EventsBlock />
        </StepPositionLeft>
        <StepPositionRight>
          <ChartsBlock chartsData={chartsDataResources['60']} />
        </StepPositionRight>
      </StepCurrentPosition>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep5);

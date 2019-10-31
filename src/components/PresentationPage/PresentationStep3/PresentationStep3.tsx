import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { StepCurrentPosition, StepPositionLeft, StepPositionRight } from '../PresentationStep2/styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import EventsBlock from './EventsBlock';
import SlidersBlock from './SlidersBlock';
import ChartsBlock from './ChartsBlock';

const PresentationStep3 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <StepCurrentPosition>
        <StepPositionLeft style={{ flex: '0 0 295px', padding: '15px', border: '1px solid #dedede' }}>
          <SlidersBlock />
          <EventsBlock />
        </StepPositionLeft>
        <StepPositionRight><ChartsBlock /></StepPositionRight>
      </StepCurrentPosition>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep3);

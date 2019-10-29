import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import EventsBlock from './EventsBlock';
import SlidersBlock from './SlidersBlock';

const PresentationStep3 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <div style={{ width: 295, padding: '15px', border: '1px solid #dedede' }}>
        <SlidersBlock />
        <EventsBlock />
      </div>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep3);

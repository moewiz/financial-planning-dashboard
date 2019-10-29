import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import EventsBlock from './EventsBlock';

const PresentationStep3 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <EventsBlock />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep3);

import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import DocumentSwitcher from '../DocumentSwitcher';

const PresentationStep2 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      
      
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep2);

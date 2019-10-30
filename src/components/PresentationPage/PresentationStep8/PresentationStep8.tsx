import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { PresentationStep8WP, StepThanksText } from './styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';

const PresentationStep8 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <PresentationStep8WP>
        <StepThanksText>Thank you and goodbye</StepThanksText>
      </PresentationStep8WP>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep8);

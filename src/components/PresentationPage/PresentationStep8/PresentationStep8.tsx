import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { PresentationStep8WP, StepThanksText, StepThanksImg } from './styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';

const PresentationStep8 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <PresentationStep8WP>
        <StepThanksImg src="http://sgp18.siteground.asia/~whistle4/images/screen_2_goodbye.png" />
        {/*<StepThanksText>Thank you and goodbye</StepThanksText>*/}
      </PresentationStep8WP>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep8);

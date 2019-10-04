import React from 'react';
import { connect } from 'formik';

import {
  TitleStep,
  TitleStepSmall,
  StepWrapper,
} from '../styled';
import {
  DocumentsStep4Form,
} from './styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';

class DocumentsStep1 extends React.PureComponent<FormikPartProps> {
  public render(): JSX.Element {
    return (
      <StepWrapper>
        <TitleStep>What are the client's goals, needs and objectives addressed by your super advice?</TitleStep>
        <TitleStepSmall>Enter Superannuation-related goals, need and objectives</TitleStepSmall>
        <DocumentsStep4Form>
          <textarea
            placeholder="You would like to maximize your superannation, to meet your retirement needs" />
        </DocumentsStep4Form>
    </StepWrapper>
    );
  }
}

export default connect<{}, DocumentData>(DocumentsStep1);

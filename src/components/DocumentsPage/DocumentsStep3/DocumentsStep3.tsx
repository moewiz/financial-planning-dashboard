import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import DocumentSwitcher from '../DocumentSwitcher';

const DocumentsStep3 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <DocumentSwitcher stepName="step3" stepData={props.formik.values.step3} />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep3);

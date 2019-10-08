import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import DocumentSwitcher from '../DocumentSwitcher';

const DocumentsStep2 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <DocumentSwitcher
        stepName="step2"
        stepData={props.formik.values.step2}
        setFieldValue={props.formik.setFieldValue}
      />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep2);

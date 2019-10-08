import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import DocumentSwitcher from '../DocumentSwitcher';

const DocumentsStep4 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <DocumentSwitcher
        stepName="step4"
        stepData={props.formik.values.step4}
        setFieldValue={props.formik.setFieldValue}
      />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep4);

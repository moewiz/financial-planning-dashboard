import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import DocumentSwitcher from '../DocumentSwitcher';

const DocumentsStep6 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <DocumentSwitcher
        stepName="step6"
        stepData={props.formik.values.step6}
        setFieldValue={props.formik.setFieldValue}
      />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep6);

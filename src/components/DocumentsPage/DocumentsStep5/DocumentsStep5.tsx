import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import CardDetails from '../DocumentsCarousel/CardDetails';

const DocumentsStep5 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <CardDetails record={props.formik.values.step5} name="step5" setFieldValue={props.formik.setFieldValue} />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep5);

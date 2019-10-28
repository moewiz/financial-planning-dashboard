import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import CardDetails from '../DocumentsCarousel/CardDetails';

const DocumentsStep7 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <CardDetails record={props.formik.values.step7} name="step7" setFieldValue={props.formik.setFieldValue} />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep7);

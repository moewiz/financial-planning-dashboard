import React from 'react';
import { ArrayHelpers, connect, FieldArray } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import GoalTable from './GoalTable';

const DocumentsStep4 = (props: FormikPartProps) => {
  const listOfLinks = props.formik.values.step2.records || [];

  return (
    <StepWrapper>
      <FieldArray name="step4.table.data" render={
        (arrayHelpers: ArrayHelpers) => (
          <GoalTable
            stepName="step4"
            stepData={props.formik.values.step4}
            setFieldValue={props.formik.setFieldValue}
            records={listOfLinks}
            arrayHelpers={arrayHelpers}
          />
        )
      } validateOnChange={false} />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep4);

import React from 'react';
import { connect } from 'formik';
import { get, map } from 'lodash';

import { StepWrapper } from '../styled';
import GoalTable from './GoalTable';
import { FormikPartProps, DocumentData } from '../PresentationPage';

const DocumentsStep4 = (props: FormikPartProps) => {
  const listOfLinks = props.formik.values.step2.records || [];

  return (
    <StepWrapper>
      <GoalTable
        stepName="step4"
        stepData={props.formik.values.step4}
        dataList={map(get(props.formik.values, 'step4.table.data', []), (data: any, index: number) => ({
          ...data,
          key: index,
        }))}
        setFieldValue={props.formik.setFieldValue}
        records={listOfLinks}
      />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep4);

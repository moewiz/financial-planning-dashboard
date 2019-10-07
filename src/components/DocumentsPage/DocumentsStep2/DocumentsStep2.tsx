import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import DocumentSwitcher from '../DocumentSwitcher';

const DocumentsStep2 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <DocumentSwitcher />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep2);

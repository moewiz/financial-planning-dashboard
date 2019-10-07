import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import CardDetails from '../DocumentsCarousel/CardDetails';

const step5 = {
  title: 'Were there any limitations to the advice provided?',
  subtitle: 'Clearly record the reason for any limitations to your advice',
  table: {
    columns: ['Missing Information', 'Reason for limitation'],
    data: [
      {
        id: 1,
        value: 'Expenses',
        description:
          'You were unable to provide us with this information. ' +
          'Therefore, the supporting calculation provided in this ' +
          'Statement of Advice is based on the assumption that all personal cash flow is spent',
      },
    ],
  },
};

const DocumentsStep5 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <CardDetails record={step5} />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep5);

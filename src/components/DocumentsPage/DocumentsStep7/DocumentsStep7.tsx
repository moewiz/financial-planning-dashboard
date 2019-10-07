import React from 'react';
import { connect } from 'formik';

import { StepWrapper } from '../styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';
import CardDetails from '../DocumentsCarousel/CardDetails';

const step7 = {
  title: 'Cost of advice',
  subtitle: 'List the costs to the client associated with preparing this advice',
  table: {
    columns: [
      {
        title: 'Description',
        dataIndex: 'description',
        width: 200,
      },
      {
        title: 'Cost to you',
        dataIndex: 'cost',
      },
      {
        title: 'Calculation of amount reviewed by us',
        dataIndex: 'amount',
        width: 300,
      },
      {
        title: 'Practice retainer',
        dataIndex: 'practice',
      },
      {
        title: 'Advisor retainer',
        dataIndex: 'advisor',
      },
    ],
    data: [
      {
        id: 1,
        description: 'Preparation fee',
        cost: '',
        amount: '',
        practice: '',
        advisor: '',
      },
      {
        id: 1,
        description: 'Ongoing advisor service fee',
        cost: '',
        amount: '',
        practice: '',
        advisor: '',
      },
    ],
  },
};

const DocumentsStep7 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <CardDetails record={step7} />
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep7);

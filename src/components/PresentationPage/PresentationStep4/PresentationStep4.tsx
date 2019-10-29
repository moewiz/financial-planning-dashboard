import React from 'react';
import { connect } from 'formik';
import { times, map } from 'lodash';

import { StepWrapper } from '../styled';
import { FormikPartProps, DocumentData } from '../PresentationPage';
import { CardList } from './styled';
import CardItem from './CardItem';

const cardLists = [
  <p>Salary Sacrifice</p>,
  <>
    <p>Non-concessional</p>
    <p>Contribution</p>
  </>,
  <>
    <p>Reduce primary</p>
    <p>Residence Loan</p>
  </>,
  <>
    <p>Another</p>
    <p>Title #4</p>
  </>,
  <>
    <p>Another</p>
    <p>Title #5</p>
  </>,
  <>
    <p>Another</p>
    <p>Title #6</p>
  </>,
];

const PresentationStep4 = (props: FormikPartProps) => {
  return (
    <>
      <CardList>
        {map(cardLists, (children, index) => (
          <CardItem key={index} src={index + 1}>
            {children}
          </CardItem>
        ))}
      </CardList>
    </>
  );
};

export default connect<{}, DocumentData>(PresentationStep4);

import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'formik';
import { map } from 'lodash';

import { FormikPartProps, DocumentData, PresentationSwitcherContext } from '../PresentationPage';
import { CardList } from './styled';
import CardItem from './CardItem';
import StrategyTemplate from './StrategyTemplate';

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
  const [slideNumber, setSlideNumber] = useState<number>(-1);
  const context = useContext(PresentationSwitcherContext);
  if (!context) {
    return null;
  }
  const { switcherContext, setSwitcherContext } = context;
  const onClickCard = (index: number) => () => {
    setSlideNumber(index);
  };
  useEffect(() => {
    if (slideNumber > -1 && switcherContext) {
      setSlideNumber(-1);
      setSwitcherContext(false);
    }
  }, [switcherContext]);

  return (
    <>
      {slideNumber > -1 ? (
        <StrategyTemplate index={slideNumber} />
      ) : (
        <CardList>
          {map(cardLists, (children, index: number) => (
            <CardItem key={index} src={index + 1} onClick={onClickCard(index)}>
              {children}
            </CardItem>
          ))}
        </CardList>
      )}
    </>
  );
};

export default connect<{}, DocumentData>(PresentationStep4);

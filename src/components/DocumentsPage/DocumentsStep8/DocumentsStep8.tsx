import React, { useContext, useEffect, useState } from 'react';
import { get, map } from 'lodash';
import { connect } from 'formik';

import { StepWrapper, TitleStep, TitleStepSmall } from '../styled';
import { DocumentsStep8WP, ListCardThumbnails } from './styled';
import { DocumentData, FormikPartProps, Record, SwitcherContext } from '../DocumentsPage';
import CardStatistic from './CardStatistic';
import DocumentsCarousel from '../DocumentsCarousel/DocumentsCarousel';

const DocumentsStep8 = (props: FormikPartProps) => {
  const [slideNumber, setSlideNumber] = useState<number>(-1);
  const context = useContext(SwitcherContext);
  if (!context) {
    return null;
  }
  const { switcherContext, setSwitcherContext } = context;
  const updateSlideNumber = (slide: number) => () => {
    setSlideNumber(slide);
    setSwitcherContext(false);
  };

  useEffect(() => {
    if (slideNumber > -1 && switcherContext) {
      setSlideNumber(-1);
      setSwitcherContext(false);
    }
  }, [switcherContext]);
  const records = get(props, 'formik.values.step8.records', []);

  return (
    <StepWrapper>
      <DocumentsStep8WP>
        {slideNumber > -1 ? (
          <DocumentsCarousel
            slideNumber={slideNumber}
            cards={records}
            stepName="step8"
            setFieldValue={props.formik.setFieldValue}
            overwrite={true}
          />
        ) : (
          <>
            <TitleStep>{get(props, 'formik.values.step8.title')}</TitleStep>
            <TitleStepSmall>{get(props, 'formik.values.step8.subtitle')}</TitleStepSmall>
            <ListCardThumbnails>
              {map(records, (record: Record, index: number) => (
                <CardStatistic record={record} key={index} onClick={updateSlideNumber(index)} />
              ))}
            </ListCardThumbnails>
          </>
        )}
      </DocumentsStep8WP>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep8);

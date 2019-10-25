import React, { useContext, useEffect, useState } from 'react';
import { filter, get, map } from 'lodash';
import { connect } from 'formik';
import { message } from 'antd';

import { StepWrapper, TitleStep, TitleStepSmall, BtnDoneDocument, StepActionDocument } from '../styled';
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
  const onClickSubmit = () => {
    props.formik.submitForm();
    message.success('Processing complete!');
  };
  const records = get(props, 'formik.values.step8.records', []);
  const checked = !records.find((record: Record) => {
    return record.table.data.find(r => r.isOverwrite === false && r.id !== -1)
  }) ;
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
            <StepActionDocument style={{ paddingRight: 32 }}>
              <BtnDoneDocument
                type="primary"
                onClick={onClickSubmit}
                disabled = {!checked}
                style={{
                  opacity: checked ? 1 : 0.6,
                }}
                >
                Generate SOA
              </BtnDoneDocument>
            </StepActionDocument>
          </>
        )}
      </DocumentsStep8WP>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep8);

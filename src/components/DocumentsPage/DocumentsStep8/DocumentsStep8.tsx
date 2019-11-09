import React, { useContext, useEffect, useState } from 'react';
import { get, map } from 'lodash';
import { connect } from 'formik';
import { message } from 'antd';

import { StepWrapper, TitleStep, TitleStepSmall, BtnDoneDocument, StepActionDocumentFixed } from '../styled';
import { DocumentsStep8WP, ListCardThumbnails } from './styled';
import { DocumentData, FormikPartProps, Record, SwitcherContext } from '../DocumentsPage';
import CardStatistic from './CardStatistic';
import DocumentsCarousel from '../DocumentsCarousel/DocumentsCarousel';

const DocumentsStep8 = (props: FormikPartProps) => {
  const [slideNumber, setSlideNumber] = useState<number>(-1);
  const [loadedPage, setLoaded] = useState<boolean>(false);
  const context = useContext(SwitcherContext);
  if (!context) {
    return null;
  }
  const { switcherContext, setSwitcherContext } = context;
  const updateSlideNumber = (slide: number) => () => {
    setSlideNumber(slide);
    setSwitcherContext(false);
  };

  // Hack: Make "loading skeleton" MUCH FASTER after if loads first time
  useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

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
    return record.table.data.find((r) => r.isOverwrite === false && r.id !== -1);
  });

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
                <CardStatistic record={record} key={index} onClick={updateSlideNumber(index)} loadedPage={loadedPage} />
              ))}
            </ListCardThumbnails>
            <StepActionDocumentFixed style={{ paddingRight: 32 }}>
              <BtnDoneDocument
                id="generate-soa-btn"
                type="primary"
                onClick={onClickSubmit}
                disabled={!checked}
                href="http://sgp18.siteground.asia/~whistle4/download/John-Samual-Nov-13-2019.docx"
                style={{
                  opacity: checked ? 1 : 0.6,
                }}
              >
                Generate SOA
              </BtnDoneDocument>
            </StepActionDocumentFixed>
          </>
        )}
      </DocumentsStep8WP>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep8);

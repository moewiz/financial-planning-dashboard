import React from 'react';
import { get, map } from 'lodash';
import { Icon } from 'antd';
import { connect } from 'formik';

import { StepWrapper, TitleStep, TitleStepSmall } from '../styled';
import { DocumentsStep8WP, ListCardThumbnails, CardThumbnailChecked, TitleCard, DoneCard } from './styled';
import { DocumentData, FormikPartProps, Record } from '../DocumentsPage';
import CardStatistic from './CardStatistic';

const DocumentsStep8 = (props: FormikPartProps) => {
  return (
    <StepWrapper>
      <TitleStep>{get(props, 'formik.values.step8.title')}</TitleStep>
      <TitleStepSmall>{get(props, 'formik.values.step8.subtitle')}</TitleStepSmall>
      <DocumentsStep8WP>
        <ListCardThumbnails>
          {map(get(props, 'formik.values.step8.records'), (record: Record, index: number) => (
            <CardStatistic record={record} key={index} />
          ))}
        </ListCardThumbnails>
      </DocumentsStep8WP>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(DocumentsStep8);

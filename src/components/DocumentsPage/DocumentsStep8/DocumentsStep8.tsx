import React from 'react';
import { Icon } from 'antd';
import { connect } from 'formik';

import {
  TitleStep,
  TitleStepSmall,
  StepWrapper,
} from '../styled';
import {
  DocumentsStep8WP,
  CardThumbnailCompleted,
  CardThumbnailItem,
  CardThumbnailChecked,
  TitleCard,
  NumberCard,
  StatusCard,
  DoneCard,
} from './styled';
import { DocumentData, FormikPartProps } from '../DocumentsPage';

class DocumentsStep8 extends React.PureComponent<FormikPartProps> {
  public render(): JSX.Element {
    return (
      <StepWrapper>
        <TitleStep>Regulatory compliance</TitleStep>
        <TitleStepSmall>The following issues were flagged</TitleStepSmall>
        <DocumentsStep8WP>
          <CardThumbnailCompleted>
            <CardThumbnailItem>
              <TitleCard>Current Position</TitleCard>
              <NumberCard>2</NumberCard>
              <StatusCard>Open issues</StatusCard>
            </CardThumbnailItem>
            <CardThumbnailItem>
              <TitleCard>Strategy</TitleCard>
              <NumberCard>1</NumberCard>
              <StatusCard>Open issues</StatusCard>
            </CardThumbnailItem>
            <CardThumbnailItem>
              <TitleCard>Product Optimizer</TitleCard>
              <NumberCard>2</NumberCard>
              <StatusCard>Open issues</StatusCard>
            </CardThumbnailItem>
            <CardThumbnailChecked>
              <TitleCard>Insurance Optimizer</TitleCard>
              <DoneCard><Icon type="check" /></DoneCard>
            </CardThumbnailChecked>
            <CardThumbnailChecked>
              <TitleCard>Document Builder</TitleCard>
              <DoneCard><Icon type="check" /></DoneCard>
            </CardThumbnailChecked>
          </CardThumbnailCompleted>
        </DocumentsStep8WP>
    </StepWrapper>
    );
  }
}

export default connect<{}, DocumentData>(DocumentsStep8);

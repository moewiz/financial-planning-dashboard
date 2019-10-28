import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'formik';
import { StepWrapper } from '../styled';
import {
  StepWelcome,
  LeftColumn,
  RightColumn,
  PresentationSection,
  PresentationLabel,
  PresentationLine,
  TitleWelcome,
} from './styled';
import { DocumentData, FormikPartProps  } from '../PresentationPage';

const PresentationStep1 = (props: FormikPartProps) => {
  const { formik } = props;
  return (
    <StepWrapper>
      <StepWelcome>
        <LeftColumn>
          <TitleWelcome>Welcome</TitleWelcome>
          <PresentationSection>
            <PresentationLabel>Advisor:</PresentationLabel>
            <PresentationLine>Mr.Always Right</PresentationLine>
          </PresentationSection>
          <PresentationSection>
            <PresentationLabel>Client:</PresentationLabel>
            <PresentationLine>Mr.John Samual</PresentationLine>
          </PresentationSection>
          <PresentationSection>
            <PresentationLabel>Date:</PresentationLabel>
            <PresentationLine>November 13th, 2019</PresentationLine>
          </PresentationSection>
        </LeftColumn>
        <RightColumn>
          <img src="http://sgp18.siteground.asia/~whistle4/images/1600.png" alt="img-step-welcome" />
        </RightColumn>
      </StepWelcome>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep1);

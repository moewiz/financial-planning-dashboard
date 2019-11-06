import React, { useState } from 'react';
import { connect } from 'formik';
import { SliderValue } from 'antd/lib/slider';

import { StepWrapper } from '../styled';
import { StepCurrentPosition, StepPositionLeft, StepPositionRight } from '../PresentationStep2/styled';
import { DocumentData, FormikPartProps } from '../PresentationPage';
import EventsBlock from './EventsBlock';
import SlidersBlock from './SlidersBlock';
import ChartsBlock from './ChartsBlock';
import { chartsDataResourcesWithLifeEvent, chartsDataResources } from './chartData';

const PresentationStep3 = (props: FormikPartProps) => {
  // a quick and dirty solution to let the presentation step 3 knows that we've added a life event
  // I have to do this because indra requires the task have to be completed within this afternoon
  // TODO: refactor this to reducer
  const [hasLifeEvent, setHasLifeEvent] = useState(false);
  const [retirementYrs, setRetirementYrs] = useState(60);
  const [chartsData, setChartsData] = useState(chartsDataResources['60']);
  const onSetHasLifeEvent = (hle: boolean) => {
    if (hle) {
      setChartsData((chartsDataResourcesWithLifeEvent as any)[retirementYrs]);
    } else {
      setChartsData((chartsDataResources as any)[retirementYrs]);
    }
    setHasLifeEvent(hle);
  };
  const onChangeRetirementYear = (retirementYear: SliderValue) => {
    if (retirementYear === 65) {
      setRetirementYrs(65);
      if (hasLifeEvent) {
        setChartsData(chartsDataResourcesWithLifeEvent['65'] as any);
      } else {
        setChartsData(chartsDataResources['65']);
      }
    }
    if (retirementYear === 60) {
      setRetirementYrs(60);
      if (hasLifeEvent) {
        setChartsData(chartsDataResourcesWithLifeEvent['60'] as any);
      } else {
        setChartsData(chartsDataResources['60']);
      }
    }
  };

  return (
    <StepWrapper>
      <StepCurrentPosition>
        <StepPositionLeft style={{ flex: '0 0 295px', padding: '15px', border: '1px solid #dedede' }}>
          <SlidersBlock onChangeRetirementYear={onChangeRetirementYear} />
          <EventsBlock setHasLifeEvent={onSetHasLifeEvent} />
        </StepPositionLeft>
        <StepPositionRight>
          <ChartsBlock chartsData={chartsData} retirementYear={retirementYrs} hasLifeEvent={hasLifeEvent} />
        </StepPositionRight>
      </StepCurrentPosition>
    </StepWrapper>
  );
};

export default connect<{}, DocumentData>(PresentationStep3);

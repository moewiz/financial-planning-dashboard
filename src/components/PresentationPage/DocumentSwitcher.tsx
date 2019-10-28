import React, { useContext, useEffect, useState } from 'react';
import { get } from 'lodash';

import DocumentsCarousel from './DocumentsCarousel/DocumentsCarousel';
import DocumentsCard from './DocumentsCard/DocumentsCard';
import { DocumentSwitcherWrapper } from './styled';
import { SwitcherContext, StepProps } from './PresentationPage';

interface DocumentSwitcherProps {
  stepName: string;
  stepData: StepProps;
  setFieldValue: (field: string, value: any) => void;
}

const DocumentSwitcher = (props: DocumentSwitcherProps) => {
  const { stepName, stepData, setFieldValue } = props;
  const [slideNumber, setSlideNumber] = useState<number>(-1);
  const context = useContext(SwitcherContext);
  if (!context) {
    return null;
  }
  const { switcherContext, setSwitcherContext } = context;
  const updateSlideNumber = (slide: number) => {
    setSlideNumber(slide);
    setSwitcherContext(false);
  };

  useEffect(() => {
    if (slideNumber > -1 && switcherContext) {
      setSlideNumber(-1);
      setSwitcherContext(false);
    }
  }, [switcherContext]);
  const cards = get(stepData, 'records', []);

  return stepData ? (
    <DocumentSwitcherWrapper>
      {slideNumber > -1 ? (
        <DocumentsCarousel
          slideNumber={slideNumber}
          stepName={stepName}
          cards={cards}
          setFieldValue={setFieldValue}
        />
      ) : (
        <DocumentsCard
          stepName={stepName}
          cards={cards}
          title={stepData.title}
          subtitle={stepData.subtitle}
          setSlideNumber={updateSlideNumber}
        />
      )}
    </DocumentSwitcherWrapper>
  ) : null;
};

export default DocumentSwitcher;

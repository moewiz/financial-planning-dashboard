import React, { useContext, useEffect, useState } from 'react';

import DocumentsCarousel from './DocumentsCarousel/DocumentsCarousel';
import DocumentsCard from './DocumentsCard/DocumentsCard';
import { DocumentSwitcherWrapper } from './styled';
import { SwitcherContext, StepProps } from './DocumentsPage';

interface DocumentSwitcherProps {
  stepName: string;
  stepData: StepProps;
}

const DocumentSwitcher = (props: DocumentSwitcherProps) => {
  const { stepName, stepData } = props;
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

  return (
    <DocumentSwitcherWrapper>
      {slideNumber > -1 ? (
        <DocumentsCarousel slideNumber={slideNumber} stepName={stepName} cards={stepData.records || []} />
      ) : (
        <DocumentsCard
          stepName={stepName}
          cards={stepData.records || []}
          title={stepData.title}
          subtitle={stepData.subtitle}
          setSlideNumber={updateSlideNumber}
        />
      )}
    </DocumentSwitcherWrapper>
  );
};

export default DocumentSwitcher;

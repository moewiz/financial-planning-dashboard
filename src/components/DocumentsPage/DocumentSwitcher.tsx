import React, { useState } from 'react';
import DocumentsCarousel from './DocumentsCarousel/DocumentsCarousel';
import DocumentsCard from './DocumentsCard/DocumentsCard';
import { DocumentSwitcherWrapper } from './styled';

const DocumentSwitcher = () => {
  const [slideNumber, setSlideNumber] = useState<number>(-1);

  return (
    <DocumentSwitcherWrapper>
      {slideNumber > -1 ? (
        <DocumentsCarousel slideNumber={slideNumber} />
      ) : (
        <DocumentsCard setSlideNumber={setSlideNumber} />
      )}
    </DocumentSwitcherWrapper>
  );
};

export default DocumentSwitcher;

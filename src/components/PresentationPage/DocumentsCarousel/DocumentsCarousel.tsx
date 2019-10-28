import React from 'react';
import { Carousel } from 'antd';

import CardDetails from './CardDetails';
import { Record } from '../PresentationPage';
import { CarouselWrapper } from './styled';
import { BtnStepDocument, StepActionDocument } from '../styled';

export interface DocumentsCarouselProps {
  slideNumber: number;
  cards: Record[];
  stepName: string;
  setFieldValue: (field: string, value: any) => void;

  overwrite?: boolean;
}

const DocumentsCarousel = (props: DocumentsCarouselProps) => {
  const { slideNumber, cards, stepName, setFieldValue, overwrite } = props;
  const carouselInstance = React.createRef<Carousel>();
  const onPrev = () => {
    if (carouselInstance.current) {
      carouselInstance.current.prev();
    }
  };
  const onNext = () => {
    if (carouselInstance.current) {
      carouselInstance.current.next();
    }
  };

  return (
    <CarouselWrapper>
      <Carousel effect="fade" dotPosition={'left'} initialSlide={slideNumber} ref={carouselInstance}>
        {cards.map((card: Record, index: number) => (
          <CardDetails
            record={card}
            key={index}
            name={`${stepName}.records.${index}`}
            setFieldValue={setFieldValue}
            overwrite={overwrite}
            showAddButton={stepName === 'step2' && card.type !== 'user'}
          />
        ))}
      </Carousel>

      <StepActionDocument>
        <BtnStepDocument onClick={onPrev}>Back</BtnStepDocument>
        <BtnStepDocument type="primary" onClick={onNext}>
          Next
        </BtnStepDocument>
      </StepActionDocument>
    </CarouselWrapper>
  );
};

export default DocumentsCarousel;

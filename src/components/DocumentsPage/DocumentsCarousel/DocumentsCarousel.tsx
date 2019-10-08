import React from 'react';
import { Carousel } from 'antd';

import { CarouselWrapper } from './styled';
import CardDetails from './CardDetails';
import { Record } from '../DocumentsPage';

export interface DocumentsCarouselProps {
  slideNumber: number;
  cards: Record[];
  stepName: string;
}

const DocumentsCarousel = (props: DocumentsCarouselProps) => {
  const { slideNumber, cards, stepName } = props;

  return (
    <CarouselWrapper>
      <Carousel effect="fade" dotPosition={'left'} initialSlide={slideNumber}>
        {cards.map((card: Record, index: number) => (
          <CardDetails record={card} key={index} />
        ))}
      </Carousel>
    </CarouselWrapper>
  );
};

export default DocumentsCarousel;

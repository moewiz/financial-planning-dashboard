import React from 'react';
import { isFunction } from 'lodash';

import { DocumentsCardWrapper } from './styled';
import CardThumbnail from './CardThumbnail';
import { TitleStep, TitleStepSmall } from '../styled';
import { Record } from '../DocumentsPage';

interface DocumentsCardProps {
  cards: Record[];
  stepName: string;
  title: string;
  subtitle?: string;
  setSlideNumber: (slideNumber: number) => void;
}

const DocumentsCard = (props: DocumentsCardProps) => {
  const { cards, title, subtitle, setSlideNumber } = props;
  const goToSlide = (slide: number) => () => {
    if (isFunction(setSlideNumber)) {
      setSlideNumber(slide);
    }
  };

  return (
    <>
      <TitleStep>{title}</TitleStep>
      <TitleStepSmall>{subtitle}</TitleStepSmall>
      <DocumentsCardWrapper>
        {cards.map((card: Record, index: number) => (
          <CardThumbnail record={card} onClick={goToSlide(index)} key={index} />
        ))}
        <CardThumbnail />
      </DocumentsCardWrapper>
    </>
  );
};

export default DocumentsCard;
